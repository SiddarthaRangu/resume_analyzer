// backend/services/analysisService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
require('dotenv').config();

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Use the correct FUNCTION NAME and the updated MODEL NAME
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });


// ... the rest of the file remains the same ...
// Function to extract text from a PDF buffer
const extractTextFromPdf = async (pdfBuffer) => {
  try {
    const data = await pdf(pdfBuffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file.');
  }
};

// Function to get analysis from Gemini
// In backend/services/analysisService.js

const getAnalysisFromGemini = async (resumeText) => {
  // NEW, UPGRADED PROMPT
  const prompt = `
    You are "Klarity", an elite AI career coach and expert technical recruiter. Your persona is encouraging, sharp, and highly insightful. You are analyzing a resume for a client who trusts you to give them a real competitive edge.

    Analyze the provided resume text thoroughly. Extract the information into a valid JSON object.
    Your analysis must be critical but constructive. Go beyond generic advice. Provide specific, actionable insights based on the content of the resume.

    The JSON object must strictly conform to the structure below. Do not include any text, markdown, or explanations before or after the JSON. Just return the raw JSON.

    Resume Text:
    """
    ${resumeText}
    """

    JSON Structure:
    {
      "name": "string | null",
      "email": "string | null",
      "phone": "string | null",
      "linkedin_url": "string | null",
      "portfolio_url": "string | null",
      "summary": "string (A brief, extracted summary from the resume)",
      "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
      "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
      "technical_skills": ["string"],
      "soft_skills": ["string"],
      "projects": [{ "name": "string", "description": "string", "tech_stack": ["string"] }],
      "certifications": ["string"],
      "analysis": {
        "overall_rating": "number (1-10, an integer)",
        "summary_feedback": "string (Critique the resume's summary. Is it impactful? Does it use strong action verbs? Is it tailored? Provide a specific example for improvement, e.g., 'Instead of...' -> 'Try...')",
        "experience_feedback": "string (Analyze the work experience descriptions. Are they results-oriented (quantified)? Or just a list of duties? Give a concrete example of how to improve one bullet point, e.g., 'Transform 'Managed social media' into 'Increased user engagement by 35% over 6 months by executing a new content strategy.'')",
        "skills_feedback": "string (Comment on the skills section. Is it well-organized? Does it blend technical and soft skills effectively? Are the skills relevant to modern roles in their likely field? Suggest one or two skills that seem to be missing based on their experience.)",
        "formatting_feedback": "string (Provide brief feedback on potential formatting issues like consistency, readability, or length. e.g., 'The resume seems slightly long; consider trimming older, less relevant descriptions to keep it to one page.')",
        "final_verdict": "string (A final, encouraging summary statement. Start with a positive reinforcement and end with a call to action. e.g., 'This is a strong foundation. By quantifying your achievements and tailoring your summary, you can transform this resume into a top-tier document that will capture any recruiter's attention.')"
      },
      "upskilling_suggestions": [
        {
          "skill": "string (e.g., 'Cloud Certifications (AWS/Azure)')",
          "reason": "string (A brief, compelling reason why this skill is relevant to their profile, e.g., 'Your experience with backend development makes you a prime candidate for cloud roles. An AWS certification would validate your skills and open doors to higher-paying DevOps and Cloud Engineering positions.')"
        },
        {
          "skill": "string (e.g., 'Advanced Python for Data Analysis')",
          "reason": "string (e.g., 'Given your interest in data, mastering libraries like Pandas and Scikit-learn will allow you to take on more complex and impactful data science projects.')"
        }
      ]
    }
  `;

  // ... rest of the function remains the same

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response to ensure it's valid JSON
    const jsonResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    return jsonResponse;
  } catch (error) {
    console.error('Error getting analysis from Gemini:', error);
    throw new Error('Failed to get analysis from AI model.');
  }
};

module.exports = {
  extractTextFromPdf,
  getAnalysisFromGemini,
};