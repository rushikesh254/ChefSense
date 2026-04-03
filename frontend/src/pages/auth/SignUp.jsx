import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function SignUp() {
  // form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    // simple validations
    if (!firstName.trim()) return toast.error("First name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!password.trim()) return toast.error("Password is required");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    setLoading(true);

    console.log(firstName, lastName, email, password);
  }

  // handle google signup
  function handleGoogleSignup() {
    setLoading(true);

    console.log("Google signup");
  }

  return (
    <div className="min-h-screen flex">
      {/* left side - signup form */}
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
                Create your account
              </h1>
              <p className="text-stone-500 mt-1">
                Start your cooking journey today
              </p>
            </div>
          </div>

          {/* signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* name fields - side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 pl-10 rounded-xl border-stone-200 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 pl-10 rounded-xl border-stone-200 text-sm"
                  />
                </div>
              </div>
            </div>

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
                  placeholder="At least 6 characters"
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs font-bold text-stone-400 uppercase">
              or
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* google signup button */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white text-stone-700 font-bold text-sm hover:bg-stone-50"
          >
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* sign in link */}
          <p className="text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-brand-500 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* right side - food image (hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/dosa.jpg"
          alt="Fresh ingredients"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* overlay with text */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-12">
          <h2 className="text-4xl font-black text-white mb-3">
            Your AI-powered <br /> kitchen assistant.
          </h2>
          <p className="text-white/70 text-lg max-w-md">
            Snap ingredients, get recipes, track your pantry — all in one place.
            Smart cooking starts here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
