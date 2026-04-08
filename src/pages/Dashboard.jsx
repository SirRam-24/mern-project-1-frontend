import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { fetchApi } from '../api/api';
import { Plus, SlidersHorizontal, Loader2, StickyNote, Pin, Search } from 'lucide-react';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('newest'); // 'newest' | 'oldest'

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const data = await fetchApi('/notes');
      if (data.ok) {
        setNotes(data.notes || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (noteData, noteId) => {
    if (noteId) {
      // Update
      const data = await fetchApi(`/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify(noteData)
      });
      if (data.ok) {
        setNotes(prev => prev.map(n => n._id === noteId ? { ...n, ...noteData } : n));
      }
    } else {
      // Create
      const data = await fetchApi('/notes', {
        method: 'POST',
        body: JSON.stringify(noteData)
      });
      if (data.ok) {
      
        await fetchNotes();
      }
    }
  };

  const handleDelete = async (noteId) => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    
    try {
      const data = await fetchApi(`/notes/${noteId}`, { method: 'DELETE' });
      if (data.ok) {
        setNotes(prev => prev.filter(n => n._id !== noteId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePin = async (noteId) => {
    try {
      const data = await fetchApi(`/notes/pin/${noteId}`);
      if (data.ok) {
        setNotes(prev => prev.map(n => n._id === noteId ? { ...n, pinned: !n.pinned } : n));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    navigate('/notes/new');
  };

  const openEditModal = (note) => {
    navigate(`/notes/edit/${note._id}`);
  };

  // Filter & Search Logic
  const filteredNotes = notes
    .filter(n => {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.caption.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return filter === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const normalNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans flex flex-col transition-colors duration-200">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white transition-colors">My Notes</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">You have {notes.length} note{notes.length !== 1 && 's'} organized.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
              </div>
              <select 
                title="Filter by Date"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none w-full appearance-none cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em' }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            
            <button 
              onClick={openCreateModal}
              className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm shadow-brand-500/30 flex items-center focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all flex-shrink-0"
            >
              <Plus className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Add Note</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-brand-500" />
            <p className="font-medium">Loading your notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/40 rounded-full flex items-center justify-center mb-6 transition-colors">
              <StickyNote className="w-10 h-10 text-brand-500 dark:text-brand-400 opacity-60" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">No notes yet</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8 transition-colors">
              You haven't created any notes. Click the 'Add Note' button to capture your first thought.
            </p>
            <button 
              onClick={openCreateModal}
              className="bg-white dark:bg-slate-800 border-2 border-brand-100 dark:border-brand-800 hover:border-brand-200 dark:hover:border-brand-700 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700 px-6 py-2.5 rounded-xl font-medium flex items-center transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              Get Started
            </button>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 transition-colors">
              <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">No matching notes</h3>
            <p className="text-slate-500 dark:text-slate-400 transition-colors">We couldn't find anything matching "{searchQuery}".</p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {pinnedNotes.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 font-sans tracking-tight transition-colors">
                  <Pin className="w-5 h-5 text-brand-500 fill-brand-500" /> Pinned Notes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {pinnedNotes.map(note => (
                    <NoteCard 
                      key={note._id} 
                      note={note} 
                      onEdit={openEditModal}
                      onDelete={handleDelete}
                      onPin={handlePin}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {normalNotes.length > 0 && (
              <div>
                {pinnedNotes.length > 0 && (
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 font-sans tracking-tight transition-colors">Other Notes</h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {normalNotes.map(note => (
                    <NoteCard 
                      key={note._id} 
                      note={note} 
                      onEdit={openEditModal}
                      onDelete={handleDelete}
                      onPin={handlePin}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
