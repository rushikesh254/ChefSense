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
import RecipesPage from "./pages/recipes/RecipesPage";
import FilterResultsPage from "./pages/recipes/FilterResultsPage";

function App() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F9F7F7] text-stone-900">
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
          <Route path="/recipes" element={<RecipesPage />} />
          <Route
            path="/recipes/quick/:quick"
            element={<FilterResultsPage type="quick" />}
          />
          <Route
            path="/recipes/cuisine/:cuisine"
            element={<FilterResultsPage type="cuisine" />}
          />
          <Route
            path="/recipes/category/:category"
            element={<FilterResultsPage type="category" />}
          />
          <Route
            path="/recipes/diet/:diet"
            element={<FilterResultsPage type="diet" />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
