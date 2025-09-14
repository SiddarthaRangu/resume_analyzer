from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import database, services

app = FastAPI()

origins = [
    "http://localhost:3000",         
    "https://resume-analyzer-neat3cx9j-siddartharangus-projects.vercel.app" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


@app.post("/api/resumes/upload")
def upload_resume(resume: UploadFile = File(...), db: Session = Depends(database.get_db)):
    if resume.content_type != 'application/pdf':
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    try:
        resume_text = services.extract_text_from_pdf(resume.file)
        
        analysis_data = services.get_analysis_from_gemini(resume_text)
        
        new_resume = database.Resume(
            file_name=resume.filename,
            **analysis_data
        )
        
        db.add(new_resume)
        db.commit()
        db.refresh(new_resume)
        
        return new_resume
        
    except Exception as e:
        print(f"Error during upload process: {e}")
        raise HTTPException(status_code=500, detail="An internal server error occurred.")

@app.get("/api/resumes")
def get_all_resumes(db: Session = Depends(database.get_db)):
    resumes = db.query(database.Resume).order_by(database.Resume.uploaded_at.desc()).all()
    return [
        {
            "id": r.id, "file_name": r.file_name, "name": r.name, 
            "email": r.email, "uploaded_at": r.uploaded_at
        } 
        for r in resumes
    ]

@app.get("/api/resumes/{resume_id}")
def get_resume_by_id(resume_id: int, db: Session = Depends(database.get_db)):
    resume = db.query(database.Resume).filter(database.Resume.id == resume_id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found.")
    return resume