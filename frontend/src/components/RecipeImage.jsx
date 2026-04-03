import { ChefHat } from "lucide-react";
import { useState } from "react";

export default function RecipeImage({ src, alt, className }) {
  const [isBroken, setIsBroken] = useState(false);

  // no img then show fallback

  if (!src || isBroken) {
    return (
      <div
        className={`flex items-center justify-center bg-amber-500 text-black ${className}`}
      >
        <ChefHat className="h-12 w-12 text-white/50" />
      </div>
    );
  }

  // Otherwise show image
  return (
    <img
      src={src}
      alt={alt || "Recipe"}
      loading="lazy"
      className={className}
      onError={() => setIsBroken(true)}
    />
  );
}
