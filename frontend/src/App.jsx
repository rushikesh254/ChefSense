// imports
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@/context/AuthContext";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/about/AboutPage";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import ContactPage from "@/pages/contact/ContactPage";
import Dashboard from "@/pages/dashboard/Dashboard";
import FAQPage from "@/pages/faqs/FAQPage";
import HowItWorksPage from "@/pages/how-it-works/HowItWorksPage";
import PantryPage from "@/pages/pantry/PantryPage";
import PantryRecipesPage from "@/pages/pantry/PantryRecipesPage";
import RecipePage from "@/pages/recipe/RecipePage";
import FilterResultsPage from "@/pages/recipes/FilterResultsPage";
import SavedRecipes from "@/pages/recipes/SavedRecipes";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// check the user is logged in or not
function RequireAuth() {
  const { user, loading } = useUser();

  // loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border border-stone-300 rounded-full flex justify-center items-center bg-stone-50 sm:px-8 px-4 sm:py-4 py-3  text-lg font-bold shadow-xl ">
          <Loader2 className="mr-3 h-6 w-6 animate-spin text-brand-600" />
          Loading...
        </div>
      </div>
    );
  }

  //if user exiast then all private  routes if not then redirect to sign in page
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}

// main app component
function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F9F7F7]">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          {/* auth pages   */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* filter routes */}
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
            {/* main recipe page */}
            <Route path="/recipe/:id" element={<RecipePage />} />
            {/* saved recipes page  */}
            <Route path="/saved-recipes" element={<SavedRecipes />} />

            {/* pantry page */}
            <Route path="/pantry" element={<PantryPage />} />
            {/* pantry recipes page (suggestions) */}
            <Route path="/pantry-recipes" element={<PantryRecipesPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
      <Toaster richColors position="bottom-right" />
    </>
  );
}

export default App;
