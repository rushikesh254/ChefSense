import { Button } from "@/components/ui/button";
import { ChefHat, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center py-20">
      {/* 404 Visual */}
      <div className="mb-8">
        <h1 className="text-6xl sm:text-9xl font-black text-stone-600 select-none">
          404
        </h1>
        <div className="flex items-center justify-center">
          <ChefHat className="w-20 h-20 text-brand-500" />
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-4 max-w-md">
        <h2 className="text-3xl font-black text-stone-900">
          Oops! The kitchen is empty.
        </h2>
        <p className="text-stone-500 font-medium">
          The page you're looking for has been tucked away or doesn't exist.
          Let's get you back to the main menu!
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-10">
        <Link to="/">
          <Button variant="primary" size="lg">
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>
      {/* Subtle hint */}
      <p className="mt-20 text-[10px] font-bold uppercase tracking-widest text-stone-600">
        Error Code: PAGE_NOT_FOUND_IN_PANTRY
      </p>
    </div>
  );
}
