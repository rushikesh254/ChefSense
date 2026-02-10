import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Clock, Users, Flame, Heart } from "lucide-react";

import { motion as Motion } from "motion/react";

import { Link } from "react-router-dom";
import { popularRecipes } from "@/lib/data";

const Popular = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}

        <Motion.div
          className="text-center mb-12 md:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="border-2 border-brand-600 hover:bg-brand-100 text-brand-700 bg-brand-50 text-sm font-bold mb-6 uppercase tracking-wide"
          >
            <Flame className="mr-1 w-3 h-3 md:w-4 md:h-4" /># Trending Now
          </Badge>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 md:mb-6 leading-[0.95]">
            Recipes Everyone <br />
            <span className="italic underline decoration-4 decoration-brand-600">
              Is Loving
            </span>
          </h2>

          <p className="text-base sm:text-xl text-stone-600 font-light px-4">
            Explore trending meals powered by AI insights and real user
            favorites.
          </p>
        </Motion.div>

        {/* Carousel */}
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {popularRecipes.map((recipe) => (
              <CarouselItem
                key={recipe.id}
                className="
                  pl-4
                  basis-[90%]
                  sm:basis-1/2
                  lg:basis-1/3
                  xl:basis-1/4
                "
              >
                <Link to="/dashboard" className="block h-full">
                  <Card className="h-full hover:shadow-lg transition duration-300 flex flex-col">
                    {/* Image */}
                    <div className="relative h-40 sm:h-48 lg:h-52">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover rounded-t-xl"
                      />

                      <Badge className="absolute top-2 left-2 bg-white text-black text-xs hover:bg-brand-500">
                        {recipe.match}% Match
                      </Badge>

                      <button className="absolute top-2 right-2 bg-white p-1.5 sm:p-2 rounded-full shadow hover:bg-brand-500">
                        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3.5 h-3.5 text-yellow-500" />
                        <span className="text-xs sm:text-sm">
                          {recipe.rating}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-base sm:text-lg mb-3 line-clamp-2 hover:text-brand-500">
                        {recipe.title}
                      </h3>

                      {/* Time & Servings */}
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-auto">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {recipe.time}
                        </div>

                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {recipe.servings}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows (hidden on small screens) */}
          <div className="hidden md:flex justify-center gap-4 mt-6  ">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>

        {/* Mobile Button */}
        <div className="mt-8 md:hidden">
          <Link to="/dashboard">
            <Button className="w-full">View All Recipes</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Popular;
