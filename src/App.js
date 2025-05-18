import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider, ROLES } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

import NavBar from './components/NavBar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Milestones from './pages/Milestones';
import Team from './pages/Team';
import Profile from './pages/Profile';
import KanbanBoard from './pages/KanbanBoard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/milestones"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.PM]}>
                <Milestones />
              </ProtectedRoute>
            }
          />

          <Route
            path="/team"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <Team />
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

          <Route path="/kanban" element={<ProtectedRoute>
            <KanbanBoard />
          </ProtectedRoute>} />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
