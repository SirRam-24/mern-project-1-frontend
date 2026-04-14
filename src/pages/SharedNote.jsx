import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApi } from '../api/api';
import Navbar from '../components/Navbar';
import { Loader2, Calendar } from 'lucide-react';

const SharedNote = () => {
  const { shareid } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSharedNote = async () => {
      try {
        const data = await fetchApi(`/notes/share/${shareid}`);
        if (data.ok && data.notes) {
          setNote(data.notes);
        } else {
          setError(data.msg || "Note not found");
        }
      } catch (err) {
        console.error(err);
        setError("Note not found or you do not have access.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSharedNote();
  }, [shareid]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-500 dark:text-brand-400" />
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Oops!</h2>
          <p className="text-slate-500 dark:text-slate-400">{error || "This note might have been deleted or the link is invalid."}</p>
        </div>
      </div>
    );
  }

  const dateStr = note.createdAt 
    ? new Date(note.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-100 dark:border-slate-700 transition-colors duration-300 w-full overflow-hidden">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-white font-sans mb-6 leading-tight transition-colors break-words">
            {note.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-10 pb-6 border-b border-slate-100 dark:border-slate-700 transition-colors">
            {dateStr && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {dateStr}
              </span>
            )}
            <span className="px-3 py-1 bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full font-medium text-xs">
              Shared Note
            </span>
          </div>

          <div 
            className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-700 dark:text-slate-300 leading-relaxed quill-content transition-colors break-words overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: note.caption }}
          />
        </div>
      </main>

      {/* Add quill styles for the viewer */}
      <style>{`
        .quill-content h1, .quill-content h2, .quill-content h3 {
          font-family: var(--font-sans), sans-serif;
          color: #0f172a;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 700;
        }
        
        .dark .quill-content h1, .dark .quill-content h2, .dark .quill-content h3 {
          color: #f8fafc;
        }
        
        .quill-content p {
          margin-bottom: 1em;
        }
        
        .quill-content ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        
        .quill-content ol {
          list-style-type: decimal;
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        
        .quill-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .dark .quill-content a {
          color: #60a5fa;
        }
        
        .quill-content blockquote {
          border-left: 4px solid #e2e8f0;
          padding-left: 1em;
          color: #64748b;
          font-style: italic;
        }
        
        .dark .quill-content blockquote {
          border-left-color: #334155;
          color: #94a3b8;
        }
        
        .quill-content pre {
          background-color: #f1f5f9;
          padding: 1em;
          border-radius: 0.5rem;
          overflow-x: auto;
          font-family: monospace;
          font-size: 0.875em;
        }
        
        .dark .quill-content pre {
          background-color: #1e293b;
        }
      `}</style>
    </div>
  );
};

export default SharedNote;
