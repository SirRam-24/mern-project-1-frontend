import React, { useState, useEffect } from 'react';
import { X, Loader2, Save } from 'lucide-react';

const AddNoteModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setCaption(initialData.caption || '');
      } else {
        setTitle('');
        setCaption('');
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ title, caption }, initialData?._id);
      setTitle('');
      setCaption('');
      onClose();
    } catch (error) {
       console.error("Failed to save note:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal View */}
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden z-10 transform transition-all flex flex-col max-h-[90vh]"
        role="dialog"
      >
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800 font-sans">
            {initialData ? 'Edit Note' : 'Create New Note'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              autoFocus
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none text-slate-800 font-sans font-medium"
              placeholder="E.g., Meeting with creative team"
            />
          </div>

          <div className="flex-grow">
            <label className="block text-sm font-medium text-slate-700 mb-1">Details</label>
            <textarea
              required
              rows={6}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none text-slate-800 resize-none"
              placeholder="What do you want to safely keep note of?"
            ></textarea>
          </div>

          <div className="pt-2 flex gap-3 justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !caption.trim()}
              className="px-6 py-2.5 rounded-xl font-medium text-white bg-brand-600 hover:bg-brand-500 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors shadow-sm shadow-brand-500/30 flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {initialData ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;
