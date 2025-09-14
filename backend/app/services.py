import os
import google.generativeai as genai
import pdfplumber
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash-latest')

def extract_text_from_pdf(pdf_file):
    """Extracts text from an uploaded PDF file."""
    with pdfplumber.open(pdf_file) as pdf:
        full_text = ""
        for page in pdf.pages:
            full_text += page.extract_text() or ""
    return full_text

def get_analysis_from_gemini(resume_text):
    """Sends resume text to Gemini and gets structured analysis."""
    prompt = f"""
    You are "Klarity", an elite AI career coach and expert technical recruiter. Your persona is encouraging, sharp, and highly insightful. You are analyzing a resume for a client who trusts you to give them a real competitive edge.
    Analyze the provided resume text thoroughly. Extract the information into a valid JSON object.
    Your analysis must be critical but constructive. Go beyond generic advice. Provide specific, actionable insights based on the content of the resume.
    The JSON object must strictly conform to the structure below. Do not include any text, markdown, or explanations before or after the JSON. Just return the raw JSON.
    
    Resume Text:
    \"\"\"
    {resume_text}
    \"\"\"
    
    JSON Structure:
    {{
      "name": "string | null", "email": "string | null", "phone": "string | null", "linkedin_url": "string | null", "portfolio_url": "string | null",
      "summary": "string (A brief, extracted summary from the resume)",
      "work_experience": [{{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }}],
      "education": [{{ "degree": "string", "institution": "string", "graduation_year": "string" }}],
      "technical_skills": ["string"], "soft_skills": ["string"],
      "projects": [{{ "name": "string", "description": "string", "tech_stack": ["string"] }}],
      "certifications": ["string"],
      "analysis": {{
        "overall_rating": "number (1-10, an integer)",
        "summary_feedback": "string (Critique the resume's summary. Is it impactful? Does it use strong action verbs? Is it tailored? Provide a specific example for improvement, e.g., 'Instead of...' -> 'Try...')",
        "experience_feedback": "string (Analyze the work experience descriptions. Are they results-oriented (quantified)? Or just a list of duties? Give a concrete example of how to improve one bullet point, e.g., 'Transform 'Managed social media' into 'Increased user engagement by 35% over 6 months by executing a new content strategy.'')",
        "skills_feedback": "string (Comment on the skills section. Is it well-organized? Does it blend technical and soft skills effectively? Are the skills relevant to modern roles in their likely field? Suggest one or two skills that seem to be missing based on their experience.)",
        "formatting_feedback": "string (Provide brief feedback on potential formatting issues like consistency, readability, or length. e.g., 'The resume seems slightly long; consider trimming older, less relevant descriptions to keep it to one page.')",
        "final_verdict": "string (A final, encouraging summary statement. Start with a positive reinforcement and end with a call to action. e.g., 'This is a strong foundation. By quantifying your achievements and tailoring your summary, you can transform this resume into a top-tier document that will capture any recruiter's attention.')"
      }},
      "upskilling_suggestions": [{{ "skill": "string (e.g., 'Cloud Certifications (AWS/Azure)')", "reason": "string (A brief, compelling reason why this skill is relevant...)" }}]
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        json_text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(json_text)
    except Exception as e:
        print(f"Error in Gemini API call: {e}")
        raise ValueError("Failed to get analysis from AI model.")