import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { fetchApi } from '../api/api';
import { ArrowLeft, Loader2, CloudUpload, CheckCircle, MoreVertical } from 'lucide-react';
import Navbar from '../components/Navbar';

const NoteEditor = () => {
  const { id } = useParams(); // will be undefined if new note
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!!id);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'unsaved'
  const saveTimeoutRef = useRef(null);
  
  // Custom toolbar options
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'blockquote', 'code-block'],
      ['clean']
    ],
  };

  useEffect(() => {
    if (id) {
      loadNote();
    }
  }, [id]);

  const loadNote = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi(`/notes/${id}`);
      if (data.ok && data.notes) {
        setTitle(data.notes.title || '');
        setCaption(data.notes.caption || '');
        setSaveStatus('saved');
      }
    } catch (err) {
      console.error(err);
      // maybe redirect if not found
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (force = false) => {
    if (!title.trim() && !caption.trim() && !force) return;
    
    setIsSaving(true);
    setSaveStatus('saving');
    
    const noteData = {
      title: title || 'Untitled Note',
      caption: caption
    };

    try {
      if (id) {
        await fetchApi(`/notes/${id}`, {
          method: 'PUT',
          body: JSON.stringify(noteData)
        });
      } else {
        const data = await fetchApi('/notes', {
          method: 'POST',
          body: JSON.stringify(noteData)
        });
        
      }
      setSaveStatus('saved');
    } catch (err) {
      console.error(err);
      setSaveStatus('unsaved');
    } finally {
      setIsSaving(false);
    }
  };

  // Setup auto-save delay
  useEffect(() => {
    if (isLoading) return;
    setSaveStatus('unsaved');
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    saveTimeoutRef.current = setTimeout(() => {

      if (id) {
        handleSave();
      }
    }, 2000);
    
    return () => clearTimeout(saveTimeoutRef.current);
  }, [title, caption]);

  const handleBack = async () => {
    if (saveStatus === 'unsaved' && (title.trim() || caption.trim())) {
      await handleSave(true);
    }
    navigate('/');
  };

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

  return (
    <div className="min-h-screen bg-[#F9FBFD] dark:bg-slate-900 transition-colors duration-200 flex flex-col">
      {/* Editor Top Bar (Google Docs Style) */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 px-4 py-2 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors focus:outline-none"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Document"
              className="font-sans text-xl font-medium text-slate-800 dark:text-slate-100 bg-transparent border-none outline-none focus:bg-slate-50 dark:focus:bg-slate-700/50 px-2 py-1 rounded placeholder:text-slate-400 dark:placeholder:text-slate-500 w-full max-w-2xl transition-colors"
            />
            <div className="flex items-center gap-4 px-2 text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              <button className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">File</button>
              <button className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Edit</button>
              <button className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">View</button>
              <button className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">Format</button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mr-2 transition-colors">
            {saveStatus === 'saving' && (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-500 dark:text-brand-400" /> Saving...
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Saved to cloud
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <CloudUpload className="w-4 h-4" /> Unsaved changes
              </>
            )}
          </div>
          
          <button 
             onClick={() => handleSave(true)}
             disabled={isSaving}
             className="bg-brand-600 hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 text-white px-5 py-2 rounded-full font-medium shadow-sm transition-colors text-sm"
          >
            Save
          </button>
          <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/50 border border-transparent dark:border-brand-800 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold uppercase cursor-pointer transition-colors">
             D
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Editor Container */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md flex-1 mb-8 transition-colors">
           <style>{`
             /* Overriding Quill Defaults to match aesthetic */
             .ql-toolbar.ql-snow {
               border: none !important;
               border-bottom: 1px solid #e2e8f0 !important;
               background-color: #f8fafc;
               padding: 12px 16px !important;
               font-family: inherit !important;
             }
             html.dark .ql-toolbar.ql-snow {
               border-bottom-color: #334155 !important;
               background-color: #0f172a;
             }
             html.dark .ql-toolbar.ql-snow .ql-stroke {
               stroke: #cbd5e1;
             }
             html.dark .ql-toolbar.ql-snow .ql-fill {
               fill: #cbd5e1;
             }
             html.dark .ql-toolbar.ql-snow .ql-picker {
               color: #cbd5e1;
             }
             .ql-container.ql-snow {
               border: none !important;
               font-family: var(--font-dm), sans-serif !important;
               font-size: 16px !important;
             }
             .ql-editor {
               min-height: 60vh;
               padding: 40px 60px !important;
               line-height: 1.6;
               color: #1e293b;
             }
             html.dark .ql-editor {
               color: #f8fafc;
             }
             .ql-editor h1, .ql-editor h2, .ql-editor h3 {
               font-family: var(--font-sans), sans-serif !important;
               color: #0f172a;
               margin-top: 1em;
               margin-bottom: 0.5em;
               font-weight: 700;
             }
             html.dark .ql-editor h1, html.dark .ql-editor h2, html.dark .ql-editor h3 {
               color: #ffffff;
             }
             .ql-editor.ql-blank::before {
               left: 60px !important;
               color: #94a3b8;
               font-style: normal !important;
             }
             html.dark .ql-editor.ql-blank::before {
               color: #64748b;
             }
           `}</style>
           <ReactQuill 
             theme="snow" 
             value={caption} 
             onChange={setCaption} 
             modules={modules}
             placeholder="Start writing here..."
             className="h-full flex flex-col"
           />
        </div>
      </main>
    </div>
  );
};

export default NoteEditor;
