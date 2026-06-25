import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { AppShell } from "../../shared/components/AppShell";
import { PageLoader } from "../../shared/components/PageLoader";

const LandingPage = lazy(() => import("../../features/landing/LandingPage"));
const AboutPage = lazy(() => import("../../features/about/AboutPage"));
const ProjectsPage = lazy(() => import("../../features/projects/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("../../features/projects/ProjectDetailPage"));
const ContactPage = lazy(() => import("../../features/contact/ContactPage"));

export function AppRouter() {
  return (
    <AppShell>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
