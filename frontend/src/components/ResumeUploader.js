import { useState } from 'react';
import axios from 'axios';

const ResumeUploader = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onAnalysisComplete(response.data);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-card p-8 rounded-lg shadow-md border border-neutral-border">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary-dark-blue">Analyze Your Resume</h2>
        <p className="text-neutral-text-secondary mt-1">Upload a PDF to receive instant, AI-driven feedback.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!file && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`p-10 border-2 border-dashed rounded-md text-center transition-colors duration-200 ${
              isDragActive ? 'border-primary-blue bg-blue-50' : 'border-neutral-border'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <p className="text-neutral-text-secondary">
                <span className="font-semibold text-primary-blue">Click to upload</span> or drag and drop
              </p>
              <p className="text-sm text-neutral-text-secondary mt-1">PDF only, up to 10MB</p>
            </label>
          </div>
        )}

        {file && (
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-md border border-neutral-border">
            <div className="flex items-center space-x-3">
              {/* File Icon */}
              <svg className="w-6 h-6 text-primary-blue flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-primary-dark-blue truncate" title={file.name}>
                {file.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                const fileInput = document.getElementById('file-upload');
                if(fileInput) fileInput.value = '';
              }}
              className="text-sm text-red-500 hover:text-red-700 font-semibold"
            >
              Remove
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isLoading}
          className="w-full py-3 px-4 bg-primary-blue text-white font-semibold rounded-md
                     hover:bg-primary-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue
                     disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Now'}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default ResumeUploader;