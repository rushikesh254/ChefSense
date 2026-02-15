import React from "react";
import { Button } from "./components/ui/button";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import FAQPage from "./pages/faqs/FAQPage";
import HowItWorksPage from "./pages/how-it-works/HowItWorksPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <Header />

      <main
        className="min-h-screen text-stone-900"
        style={{
          background: `linear-gradient(
  180deg,
  #faf7f4 0%,
  #f5efe8 50%,
  #faf7f4 100%
)`,
        }}
      >
        <Routes>
          {/* public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
