import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PatientsList from './components/patients/PatientsList';
import PatientForm from './components/patients/PatientForm';
import PatientDetails from './components/patients/PatientDetails';
import AppointmentsList from './components/appointments/AppointmentsList';
import AppointmentForm from './components/appointments/AppointmentForm';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Loading from './components/common/Loading';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <Loading />;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Main layout with sidebar
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/dashboard" />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/patients" element={
            <ProtectedRoute>
              <MainLayout>
                <PatientsList />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/patients/new" element={
            <ProtectedRoute>
              <MainLayout>
                <PatientForm />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/patients/:id" element={
            <ProtectedRoute>
              <MainLayout>
                <PatientDetails />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/patients/:id/edit" element={
            <ProtectedRoute>
              <MainLayout>
                <PatientForm />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/appointments" element={
            <ProtectedRoute>
              <MainLayout>
                <AppointmentsList />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/appointments/new" element={
            <ProtectedRoute>
              <MainLayout>
                <AppointmentForm />
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;