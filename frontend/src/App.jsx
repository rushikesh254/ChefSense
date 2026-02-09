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

function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen ">
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
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
