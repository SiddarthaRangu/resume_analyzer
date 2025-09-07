const PastResumesTable = ({ resumes, onViewDetails, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading resume history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-red-200 p-8">
        <div className="flex items-center space-x-3 text-red-600">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Unable to load resume history</h3>
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 p-12">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Resumes Analyzed Yet</h3>
            <p className="text-slate-500 max-w-md">Start by uploading your first resume in the Resume Analysis tab to see your history here.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Resume History</h2>
          <p className="text-slate-600 mt-1">{resumes.length} resume{resumes.length !== 1 ? 's' : ''} analyzed</p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Most recent first</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 overflow-hidden shadow-lg">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Resume Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resumes.map((resume, index) => (
                <tr key={resume.id} className="hover:bg-slate-50/50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 truncate max-w-xs" title={resume.file_name}>
                          {resume.file_name}
                        </p>
                        <p className="text-sm text-slate-500">PDF Document</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800">{resume.name || 'N/A'}</p>
                      <p className="text-sm text-slate-500">{resume.email || 'No email provided'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {new Date(resume.uploaded_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(resume.uploaded_at).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onViewDetails(resume.id)}
                      className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-xl transition-all duration-200 hover:shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-6">
          {resumes.map((resume, index) => (
            <div key={resume.id} className="bg-white/50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm truncate max-w-40" title={resume.file_name}>
                      {resume.file_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(resume.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onViewDetails(resume.id)}
                  className="px-3 py-1 text-xs font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg transition-all duration-200"
                >
                  View
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700">{resume.name || 'N/A'}</p>
                <p className="text-xs text-slate-500">{resume.email || 'No email provided'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastResumesTable;