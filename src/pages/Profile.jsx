import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  // Generate a predictable avatar color based on username
  const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-rose-500', 'bg-orange-500', 'bg-emerald-500', 'bg-cyan-500'];
  const colorIndex = user.UserName ? user.UserName.length % colors.length : 0;
  const avatarBg = colors[colorIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
           <Link to="/" className="text-sm font-medium text-brand-600 hover:text-brand-500 flex items-center mb-4 transition-colors">
             &larr; Back to Dashboard
           </Link>
           <h1 className="text-3xl font-bold text-slate-800 dark:text-white font-sans transition-colors">Account Profile</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
          {/* Cover Photo */}
          <div className="h-32 sm:h-48 bg-gradient-to-r from-brand-500 to-indigo-600 relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          </div>
          
          <div className="px-6 sm:px-12 pb-12">
            {/* Avatar block */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20 mb-8 gap-6">
              <div className={`w-32 h-32 sm:w-40 sm:h-40 ${avatarBg} rounded-full border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center text-white text-5xl font-bold uppercase transition-colors`}>
                 {user.username ? user.username.charAt(0) : 'U'}
              </div>
              <div className="text-center sm:text-left mb-2">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white font-sans transition-colors">{user.UserName}</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">Super Note Taker</p>
              </div>
              <div className="sm:ml-auto">
                 <button 
                  onClick={logout}
                  className="px-5 py-2.5 flex items-center border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>

            {/* Profile Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              
              <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start gap-4 transition-colors">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-brand-600 dark:text-brand-400 transition-colors">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 transition-colors">Username</p>
                  <p className="font-semibold text-slate-800 dark:text-white text-lg transition-colors">{user.username}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start gap-4 transition-colors">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 transition-colors">Email Address</p>
                  <p className="font-semibold text-slate-800 dark:text-white text-lg break-all transition-colors">{user.email}</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start gap-4 md:col-span-2 transition-colors">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1 transition-colors">Internal Reference ID</p>
                  <p className="font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-slate-900/50 p-2 rounded-lg mt-1 inline-block break-all transition-colors">{user._id}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors">This ID is permanently linked to your account.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

    </div>
  );
};

export default Profile;
