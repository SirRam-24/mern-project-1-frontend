import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import NoteEditor from './pages/NoteEditor'

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={token ? <Navigate to="/" replace /> : <Login />} 
      />
      
      <Route 
        path="/sign-up" 
        element={token ? <Navigate to="/" replace /> : <Register />} 
      />

      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/notes/new" 
        element={
          <ProtectedRoute>
            <NoteEditor />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/notes/edit/:id" 
        element={
          <ProtectedRoute>
            <NoteEditor />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profile"  
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App