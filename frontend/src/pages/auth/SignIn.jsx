import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function SignIn() {
  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    // simple validation
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");

    setLoading(true);

    console.log(email, password);
  }

  // handle google login
  function handleGoogleLogin() {
    setLoading(true);

    console.log("Google login");
  }

  return (
    <div className="min-h-screen flex">
      {/* left side - food image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/auth-food.png"
          alt="Fresh ingredients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* overlay with text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12">
          <h2 className="text-4xl font-black text-white mb-3">
            Cook smarter, <br /> not harder.
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            Join thousands who save time and money by turning everyday
            ingredients into delicious meals with AI.
          </p>
        </div>
      </div>

      {/* right side - login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo and heading */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src="/orange_logo.png"
                alt="Logo"
                className="sm:w-30 sm:h-30 w-20 h-20"
              />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-stone-900">
                Welcome back
              </h1>
              <p className="text-stone-500 mt-1">Sign in to continue cooking</p>
            </div>
          </div>

          {/* login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* email field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-stone-500">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10 rounded-xl border-stone-200 text-sm"
                />
              </div>
            </div>

            {/* password field */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-stone-500">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-10 rounded-xl border-stone-200 text-sm"
                />
                {/* toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* submit button */}
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="h-12 rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          {/* divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs font-bold text-stone-400 uppercase">
              Or
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* google login button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white text-stone-700 font-bold text-sm hover:bg-stone-50"
          >
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* sign up link */}
          <p className="text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-brand-500 font-bold hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
