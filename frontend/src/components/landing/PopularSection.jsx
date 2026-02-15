import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Img as Image } from "@/components/ui/img";
import { Star, Clock, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { popularRecipes } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PopularSection() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16 max-w-2xl mx-auto">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-4">
            Trending This Week
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Popular Right Now
          </h2>

          <p className="text-stone-500 text-base sm:text-lg">
            Discover what thousands of cooks are loving today.
          </p>
        </div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-5">
            {popularRecipes.map((recipe, index) => (
              <CarouselItem
                key={recipe.id}
                className="pl-5 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Link to="/dashboard" className="group block h-full">
                  <Card
                    className="
                      h-full 
                      rounded-2xl 
                      border border-stone-200/60 
                      bg-white/80 
                      shadow-sm 
                      hover:shadow-md 
                      hover:-translate-y-1
                      transition duration-300 
                      flex flex-col
                      overflow-hidden
                    "
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        priority={true}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      {/* Match Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="outline"
                          className="bg-white/90 text-brand-600 border-brand-200 text-xs font-semibold backdrop-blur-sm"
                        >
                          {recipe.match}% Match
                        </Badge>
                      </div>

                      {/* Save Button */}
                      <button
                        aria-label="Save recipe"
                        className="
                          absolute top-3 right-3 
                          bg-white/90 
                          backdrop-blur-sm
                          p-2 
                          rounded-full 
                          border border-stone-200
                          text-stone-400
                          hover:text-red-500
                          hover:scale-110
                          transition
                        "
                      >
                        <Heart className="w-4 h-4" aria-hidden="true" />
                      </button>

                      {/* Trending tag on first card */}
                      {index === 0 && (
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-brand-600 text-white text-xs font-medium px-2.5 py-0.5">
                            🔥 Most Loved
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardContent className="p-4 flex flex-col flex-grow">
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star
                          className="w-3.5 h-3.5 text-brand-500 fill-brand-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold text-stone-800">
                          {recipe.rating}
                        </span>
                        <span className="text-xs text-stone-400">
                          ({recipe.reviews})
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-stone-800 line-clamp-2 mb-3 group-hover:text-brand-600 transition-colors">
                        {recipe.title}
                      </h3>

                      {/* Meta */}
                      <div className="flex justify-between text-xs text-stone-500 mt-auto pt-3 border-t border-stone-100">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {recipe.time}
                        </div>

                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" aria-hidden="true" />
                          {recipe.servings}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows — visible from sm (tablet) breakpoint */}
          <div className="hidden sm:flex justify-center gap-4 mt-10">
            <CarouselPrevious className="border border-stone-200 bg-white hover:bg-brand-600 hover:text-white transition shadow-sm" />
            <CarouselNext className="border border-stone-200 bg-white hover:bg-brand-600 hover:text-white transition shadow-sm" />
          </div>
        </Carousel>

        {/* Mobile CTA — only on small screens where arrows are hidden */}
        <div className="mt-10 sm:hidden">
          <Button
            asChild
            variant="primary"
            className="w-full py-5 text-lg hover:scale-[1.02] transition-transform"
          >
            <Link to="/dashboard">View All Recipes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
