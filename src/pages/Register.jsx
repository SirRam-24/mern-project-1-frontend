import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchApi } from '../api/api';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const data = await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      if (data.ok) {
        navigate('/login');
      } else {
        setErrorMsg(data.msg || 'Registration failed');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse transition-colors">
        
        {/* Right Side: Aesthetic Background (Reversed) */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-brand-600 to-slate-800 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 -ml-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-64 h-64 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>
          
          <div className="z-10 mt-8 mb-auto">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl mb-8 flex items-center justify-center">
               <span className="text-white font-bold text-2xl font-sans">N</span>
            </div>
            <h2 className="text-4xl font-bold font-sans mb-4 leading-tight">
              Start your <br/> journey.
            </h2>
            <p className="text-slate-200 text-lg opacity-90 font-light max-w-sm">
              Create an account today to organize everything that matters.
            </p>
          </div>
          <div className="z-10 mt-8">
            <p className="text-sm text-slate-400">© 2026 AppName. All rights reserved.</p>
          </div>
        </div>

        {/* Left Side: Register Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-sans transition-colors">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 transition-colors">Sign up to get started.</p>

            {errorMsg && (
              <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:focus:border-brand-500 transition-all outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="E.g. johndoe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:focus:border-brand-500 transition-all outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:focus:border-brand-500 transition-all outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-medium bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800 transition-all shadow-sm shadow-slate-800/30 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
