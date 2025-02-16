import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./components/home";
import LandingPage from "./components/landing/LandingPage";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import LinkedInIntegration from "./components/settings/LinkedInIntegration";
import CampaignForm from "./components/campaigns/CampaignForm";
import ConnectionAutomation from "./components/connections/ConnectionAutomation";
import FollowerScraper from "./components/scraper/FollowerScraper";
import JobAutomation from "./components/jobs/JobAutomation";
import ProspectUploader from "./components/prospects/ProspectUploader";
import TemplateEditor from "./components/templates/TemplateEditor";
import CampaignList from "./components/dashboard/CampaignList";
import routes from "tempo-routes";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <LoginForm />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <SignupForm />}
          />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="campaigns" element={<CampaignList />} />
            <Route path="campaigns/new" element={<CampaignForm />} />
            <Route path="connections" element={<ConnectionAutomation />} />
            <Route path="scraper" element={<FollowerScraper />} />
            <Route path="jobs" element={<JobAutomation />} />
            <Route path="prospects" element={<ProspectUploader />} />
            <Route path="templates" element={<TemplateEditor />} />
            <Route path="settings/linkedin" element={<LinkedInIntegration />} />
          </Route>
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
