import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Footer from './components/Footer'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/about/AboutPage'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ContactPage from './pages/contact/ContactPage'
import Dashboard from './pages/dashboard/Dashboard'
import FAQPage from './pages/faqs/FAQPage'
import HowItWorksPage from './pages/how-it-works/HowItWorksPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import TermsPage from './pages/legal/TermsPage'
import PantryPage from './pages/pantry/PantryPage'
import FilterResultsPage from './pages/recipes/FilterResultsPage'
import RecipesPage from './pages/recipes/RecipesPage'

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
          <Route path="/pantry" element={<PantryPage />} />
        </Routes>
        <Toaster richColors position="bottom-right" />
      </main>
      <Footer />
    </>
  )
}

export default App
