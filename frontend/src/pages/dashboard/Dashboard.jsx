import React from "react";
import { DUMMY_DATA } from "@/lib/dummydata";
import { Img as Image } from "@/components/ui/img";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import { stripHtml } from "@/lib/utils";

const {
  recipeOfTheDay,
  categories,
  cuisines,
  diets,
  trending,
  quickMeals,
  wasteStats,
  recentlyViewed,
  cookingTips,
} = DUMMY_DATA;

let heroSummary = "";

if (recipeOfTheDay && recipeOfTheDay.summary) {
  // Step 1: Remove HTML tags
  let cleaned = stripHtml(recipeOfTheDay.summary);

  // Step 2: Check length
  if (cleaned.length > 160) {
    heroSummary = cleaned.substring(0, 160) + "...";
  } else {
    heroSummary = cleaned;
  }
}

const Dashboard = () => {
  return (
    <div className="min-h-screen pb-24">
      {/* hero section  */}

      {recipeOfTheDay && (
        <section className="relative h-[85vh] w-full overflow-hidden">
          <Image
            src={recipeOfTheDay.image}
            alt={recipeOfTheDay.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

          {/* content  */}

          <div className="relative z-10 mx-auto h-full max-w-7xl px-6 flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              <Badge className="bg-brand-500 hover:bg-brand-800 text-white border-none px-4 py-1 text-xs font-bold uppercase tracking-widest">
                <Flame
                  className="mr-2 w-3.5 h-3.5 fill-current"
                  aria-hidden="true"
                />
                Featured Today
              </Badge>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tighter">
                {recipeOfTheDay.title}
              </h1>

              <p className="text-lg md:text-xl text-stone-200/90 leading-relaxed max-w-lg font-medium">
                {heroSummary}
              </p>
             
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
