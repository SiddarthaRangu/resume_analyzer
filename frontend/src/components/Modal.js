import { useEffect } from 'react';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-start pt-8 px-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden relative animate-slideUp">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-8 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Resume Analysis Details</h2>
            <p className="text-sm text-slate-500">Detailed breakdown and insights</p>
          </div>
          <button
            onClick={onClose}
            className="group w-10 h-10 rounded-full bg-slate-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg 
              className="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-colors duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] custom-scrollbar">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f8fafc;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default Modal;