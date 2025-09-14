import { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';
import ResumeDetails from './components/ResumeDetails';
import Modal from './components/Modal';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [activeTab, setActiveTab] = useState('analysis');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [pastResumes, setPastResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPastResumes = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await axios.get('/api/resumes');
      setPastResumes(response.data);
    } catch (err) {
      setError('Failed to fetch past resumes.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'history') {
      fetchPastResumes();
    }
  }, [activeTab]);

  const handleAnalysisComplete = (data) => {
    setAnalysisResult(data);
  };

  const handleViewDetails = async (resumeId) => {
    try {
      const response = await axios.get(`/api/resumes/${resumeId}`);
      setSelectedResume(response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch resume details.');
    }
  };
  
  const tabClass = (tabName) => 
    `px-4 py-2 text-sm font-semibold rounded-md focus:outline-none transition-colors duration-200 ${
      activeTab === tabName 
        ? 'bg-neutral-card shadow text-primary-dark-blue' 
        : 'text-neutral-text-secondary hover:bg-neutral-card/50'
    }`;


  return (
    <div className="min-h-screen bg-neutral-bg font-sans text-neutral-text-primary">
      <header className="bg-neutral-card shadow-sm border-b border-neutral-border sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-primary-dark-blue">
            DeepKlarity Resume Analyzer
          </h1>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-8 p-1 bg-slate-200/50 rounded-lg inline-flex space-x-1">
          <button onClick={() => setActiveTab('analysis')} className={tabClass('analysis')}>
            Resume Analysis
          </button>
          <button onClick={() => setActiveTab('history')} className={tabClass('history')}>
            Historical Viewer
          </button>
        </div>

        <div>
          {activeTab === 'analysis' && (
            <div className="space-y-8">
              <ResumeUploader onAnalysisComplete={handleAnalysisComplete} />
              {analysisResult && <ResumeDetails data={analysisResult} />}
            </div>
          )}

          {activeTab === 'history' && (
            <PastResumesTable
              resumes={pastResumes}
              onViewDetails={handleViewDetails}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ResumeDetails data={selectedResume} />
        </Modal>
      )}
    </div>
  );
}

export default App;