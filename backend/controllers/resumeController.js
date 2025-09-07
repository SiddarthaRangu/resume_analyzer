// backend/controllers/resumeController.js
const db = require('../db');
const { extractTextFromPdf, getAnalysisFromGemini } = require('../services/analysisService');

console.log("✅ Loading the LATEST version of resumeController.js!"); // <-- ADD THIS LINE

const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  try {
    // 1. Extract text from PDF
    const resumeText = await extractTextFromPdf(req.file.buffer);

    // 2. Get the new, detailed analysis from Gemini
    const analysisData = await getAnalysisFromGemini(resumeText);

    // 3. Destructure the NEW analysis data object
    const {
      name, email, phone, linkedin_url, portfolio_url, summary,
      work_experience, education, technical_skills, soft_skills,
      projects, certifications, analysis, // <-- This is the new object
      upskilling_suggestions,
    } = analysisData;

    // 4. Prepare the query for the NEW database structure
    const query = `
      INSERT INTO resumes (
        file_name, name, email, phone, linkedin_url, portfolio_url, summary,
        work_experience, education, technical_skills, soft_skills, projects,
        certifications, analysis, upskilling_suggestions
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *;
    `;
    
    // 5. Prepare the values, ensuring we stringify the JSONB fields
    const values = [
      req.file.originalname, name, email, phone, linkedin_url, portfolio_url, summary,
      JSON.stringify(work_experience || []),
      JSON.stringify(education || []),
      JSON.stringify(technical_skills || []),
      JSON.stringify(soft_skills || []),
      JSON.stringify(projects || []),
      JSON.stringify(certifications || []),
      JSON.stringify(analysis || {}), // <-- Correctly stringify the new analysis object
      JSON.stringify(upskilling_suggestions || []) // <-- Correctly stringify suggestions
    ];
    
    const { rows } = await db.query(query, values);
    
    // 6. Return the full, newly created record
    res.status(201).json(rows[0]);

  } catch (error) {
    // This is where your error is being caught and logged
    console.error('Error in uploadResume controller:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

const getAllResumes = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, file_name, name, email, uploaded_at FROM resumes ORDER BY uploaded_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching all resumes:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};

const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM resumes WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Resume not found.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(`Error fetching resume with id ${req.params.id}:`, error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
};

module.exports = {
  uploadResume,
  getAllResumes,
  getResumeById,
};