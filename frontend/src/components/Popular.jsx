import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Img as Image } from "@/components/ui/img";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Clock, Users, Flame, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { popularRecipes } from "@/lib/data";

const Popular = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-50/20 to-white pointer-events-none" />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto">
            <Badge
              variant="outline"
              className="border border-brand-600 text-brand-600 bg-brand-50 text-xs sm:text-sm font-semibold mb-5 uppercase tracking-wide"
            >
              <Flame className="mr-1 w-3 h-3 sm:w-4 sm:h-4" />
              Trending Recipes
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Popular Right Now
            </h2>

            <p className="text-sm sm:text-base text-stone-600">
              Meals people are cooking and loving this week.
            </p>
          </div>

          {/* Carousel */}
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {popularRecipes.map((recipe) => (
                <CarouselItem
                  key={recipe.id}
                  className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Link to="/dashboard" className="block h-full group">
                    <Card className="h-full rounded-xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md flex flex-col">
                      {/* Image */}
                      <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-xl">
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Match badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white text-brand-600 border border-brand-200 text-xs font-medium">
                            {recipe.match}% Match
                          </Badge>
                        </div>

                        {/* Save icon */}
                        <button className="absolute top-3 right-3 bg-white p-2 rounded-full border border-stone-200 text-stone-400 hover:text-brand-600 transition">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <CardContent className="p-4 flex flex-col flex-grow">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-4 h-4 text-brand-500" />
                          <span className="text-sm font-medium">
                            {recipe.rating}
                          </span>
                          <span className="text-xs text-stone-400">
                            ({recipe.reviews})
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-semibold text-stone-900 line-clamp-2 mb-3 group-hover:text-brand-600 transition">
                          {recipe.title}
                        </h3>

                        {/* Meta */}
                        <div className="flex justify-between text-xs sm:text-sm text-stone-600 mt-auto">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-brand-500" />
                            {recipe.time}
                          </div>

                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-brand-500" />
                            {recipe.servings}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows */}
            <div className="hidden md:flex justify-center gap-4 mt-8">
              <CarouselPrevious className="border border-stone-200 bg-white hover:bg-brand-600 hover:text-white transition" />
              <CarouselNext className="border border-stone-200 bg-white hover:bg-brand-600 hover:text-white transition" />
            </div>
          </Carousel>

          {/* Mobile CTA */}
          <div className="mt-10 md:hidden">
            <Link to="/dashboard">
              <Button variant="primary" className="w-full">
                View All Recipes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Popular;
