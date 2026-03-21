import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useUser } from '@/context/AuthContext'
import LandingPage from '@/pages/LandingPage'
import AboutPage from '@/pages/about/AboutPage'
import SignIn from '@/pages/auth/SignIn'
import SignUp from '@/pages/auth/SignUp'
import ContactPage from '@/pages/contact/ContactPage'
import Dashboard from '@/pages/dashboard/Dashboard'
import FAQPage from '@/pages/faqs/FAQPage'
import HowItWorksPage from '@/pages/how-it-works/HowItWorksPage'
import PrivacyPage from '@/pages/legal/PrivacyPage'
import TermsPage from '@/pages/legal/TermsPage'
import PantryPage from '@/pages/pantry/PantryPage'
import PantryRecipesPage from '@/pages/pantry/PantryRecipesPage'
import RecipePage from '@/pages/recipe/RecipePage'
import FilterResultsPage from '@/pages/recipes/FilterResultsPage'
import SavedRecipes from '@/pages/recipes/SavedRecipes'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

function RequireAuth() {
  const { user, loading } = useUser()

  if (loading) {
    return null
  }

  return user ? <Outlet /> : <Navigate to="/sign-in" />
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pantry" element={<PantryPage />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
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

            <Route path="/pantry/recipes" element={<PantryRecipesPage />} />
          </Route>
        </Route>
      </Routes>
      <Toaster richColors position="bottom-right" />
    </>
  )
}

export default App
