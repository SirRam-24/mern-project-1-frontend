import React from 'react';
import { Edit2, Trash2, Pin, Share2, Loader2 } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete, onPin, onShare, isSharing = false }) => {
  // Extracting standard dates formatting
  const dateStr = note.createdAt 
    ? new Date(note.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : '';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
      
      {/* Decorative accent block */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-400 to-brand-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white font-sans line-clamp-2 leading-tight transition-colors flex-1 break-words">
          {note.title}
        </h3>
        <div className="flex flex-wrap sm:flex-nowrap justify-end gap-1 sm:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
          <button 
            onClick={() => onPin(note._id)}
            className={`p-1.5 transition-colors focus:outline-none rounded-lg ${note.pinned ? 'text-brand-600 bg-brand-50 dark:bg-brand-900/30' : 'text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700'}`}
            aria-label={note.pinned ? "Unpin note" : "Pin note"}
          >
            <Pin className="w-4 h-4" style={note.pinned ? { fill: 'currentColor' } : {}} />
          </button>
          <button 
            onClick={() => onShare(note)}
            disabled={isSharing}
            className={`p-1.5 rounded-lg transition-colors focus:outline-none ${isSharing ? 'text-brand-500 bg-brand-50 dark:bg-slate-700 cursor-not-allowed' : 'text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700'}`}
            aria-label="Share note"
          >
            {isSharing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
          <button 
            onClick={() => onEdit(note)}
            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700 rounded-lg transition-colors focus:outline-none"
            aria-label="Edit note"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(note._id)}
            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors focus:outline-none"
            aria-label="Delete note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div 
        className="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap flex-grow mb-4 opacity-90 line-clamp-4 transition-colors break-words overflow-hidden"
        dangerouslySetInnerHTML={{ __html: note.caption }}
      />
      
      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium transition-colors">
          {dateStr}
        </span>
      </div>
    </div>
  );
};

export default NoteCard;
