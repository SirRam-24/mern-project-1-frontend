import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../api/api';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.ok) {
        login(data.token);
        navigate('/');
      } else {
        setErrorMsg(data.msg || 'Login failed');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-colors">
        
        {/* Left Side: Aesthetic Background */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-brand-500 to-brand-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-brand-500 opacity-20 blur-3xl"></div>
          
          <div className="z-10 mt-8 mb-auto">
            <div className="w-12 h-12 bg-white rounded-xl mb-8 flex items-center justify-center">
               <span className="text-brand-600 font-bold text-2xl font-sans">N</span>
            </div>
            <h2 className="text-4xl font-bold font-sans mb-4 leading-tight">
              Capture your <br/> best ideas.
            </h2>
            <p className="text-blue-100 text-lg opacity-90 font-light max-w-sm">
              Keep all your thoughts, tasks, and notes neatly organized in one secure place.
            </p>
          </div>
          <div className="z-10 mt-8">
            <p className="text-sm text-blue-200">© 2026 AppName. All rights reserved.</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-sans transition-colors">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8 transition-colors">Please enter your details to sign in.</p>

            {errorMsg && (
              <div className="p-3 mb-6 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">Password</label>
                  <a href="#" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors">Forgot password?</a>
                </div>
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
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-medium bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-sm shadow-brand-500/30 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 transition-colors">
              Don't have an account?{' '}
              <Link to="/sign-up" className="font-medium text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 transition-colors">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
