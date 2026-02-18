// import { useState } from "react";
//  import "./App.css";
//  import Home from "./home.jsx";
// import logoSrc from "/img/a-sleek-modern-logo-design-featuring-the_goDenOD7TPS-KtuXM3BUnA_RzVYVD7bSjiL0zKDsLJ0uw-Photoroom.png";
// import Login from "./auth.jsx";
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout.tsx';
import { DashboardLayout } from './components/layout/DashboardLayout.tsx';
import { LandingPage } from './pages/public/LandingPage.tsx';
import { LoginPage } from './pages/auth/LoginPage.tsx';
import { RegisterPage } from './pages/auth/RegisterPage.tsx';
import { CollegeDashboard } from './pages/college/CollegeDashboard.tsx';
import { CreateEvent } from './pages/college/CreateEvent.tsx';
import { MyEvents } from './pages/college/MyEvents.tsx';
import { Requests } from './pages/college/Requests.tsx';
import { SponsorDashboard } from './pages/sponsor/SponsorDashboard.tsx';
import { BrowseEvents } from './pages/sponsor/BrowseEvents.tsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.tsx';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/browse" element={<BrowseEvents />} />
      </Route>

      {/* Dashboard Routes */}
      <Route element={<DashboardLayout />}>
        {/* College Routes */}
        <Route path="/college/dashboard" element={<CollegeDashboard />} />
        <Route path="/college/create-event" element={<CreateEvent />} />
        <Route path="/college/events" element={<MyEvents />} />
        <Route path="/college/requests" element={<Requests />} />
        <Route path="/college/payments" element={<div className="p-6">Payments Page (Coming Soon)</div>} />
        <Route path="/college/profile" element={<div className="p-6">Profile Page (Coming Soon)</div>} />

        {/* Sponsor Routes */}
        <Route path="/sponsor/dashboard" element={<SponsorDashboard />} />
        <Route path="/sponsor/browse" element={<BrowseEvents />} />
        <Route path="/sponsor/history" element={<div className="p-6">History Page (Coming Soon)</div>} />
        <Route path="/sponsor/profile" element={<div className="p-6">Profile Page (Coming Soon)</div>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<div className="p-6">Manage Users (Coming Soon)</div>} />
        <Route path="/admin/events" element={<div className="p-6">Manage Events (Coming Soon)</div>} />
        <Route path="/admin/monitoring" element={<div className="p-6">Monitoring (Coming Soon)</div>} />
        <Route path="/admin/reports" element={<div className="p-6">Reports (Coming Soon)</div>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

