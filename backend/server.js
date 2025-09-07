const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  'http://localhost:3000', 
  'https://resume-analyzer-pied.vercel.app' 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/api/resumes', resumeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Resume Analyzer API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});