import os
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import datetime

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String, nullable=False)
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    linkedin_url = Column(String)
    portfolio_url = Column(String)
    summary = Column(Text)
    work_experience = Column(JSON)
    education = Column(JSON)
    technical_skills = Column(JSON)
    soft_skills = Column(JSON)
    projects = Column(JSON)
    certifications = Column(JSON)
    analysis = Column(JSON)
    upskilling_suggestions = Column(JSON)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()