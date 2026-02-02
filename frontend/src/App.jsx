import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadLogs from "./pages/UploadLogs.jsx";
import LogViewer from "./pages/LogViewer.jsx";
import Alerts from "./pages/Alerts.jsx";
import AlertDetail from "./pages/AlertDetail.jsx";
import Incidents from "./pages/Incidents.jsx";
import IncidentDetail from "./pages/IncidentDetail.jsx";
import Cases from "./pages/Cases.jsx";
import CaseDetail from "./pages/CaseDetail.jsx";
import Reports from "./pages/Reports.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  return (
    
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      {/* Protected with Layout */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }

      >
         
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<UploadLogs />} />
        <Route path="logs" element={<LogViewer />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="alerts/:id" element={<AlertDetail />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="incidents/:id" element={<IncidentDetail />} />
        <Route path="cases" element={<Cases />} />
        <Route path="cases/:id" element={<CaseDetail />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
