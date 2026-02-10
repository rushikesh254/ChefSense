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
import {
  ArrowRight,
  Star,
  Clock,
  Users,
  Zap,
  Flame,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { popularRecipes } from "@/lib/data";

import { motion as Motion } from "motion/react";
const Popular = () => {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <Motion.div
          className="text-center mb-12 md:mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="border-2 border-brand-600 text-brand-700 bg-brand-50 text-sm font-bold mb-6 uppercase tracking-wide"
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

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-6">
            {popularRecipes.map((recipe) => (
              <CarouselItem
                key={recipe.id}
                className="pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Link to={`dashboard`} className="block h-full group">
                  <Card
                    className="
    h-full
    border
    backdrop-blur-sm
    rounded-xl
    overflow-hidden
    flex flex-col
    shadow-sm
    transition-transform
    hover:shadow-lg
    hover:-translate-y-1
    duration-300
  "
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t  transition" />

                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 backdrop-blur border  border-brand-200 text-brand-600 font-semibold shadow-sm">
                          {recipe.match}% Match
                        </Badge>
                      </div>

                      <button
                        className="
        absolute top-3 right-3
        p-2
        bg-white/90
        backdrop-blur-md
        rounded-full
        border border-stone-200
        text-stone-400
        transition-all
        hover:text-brand-600
        hover:border-brand-200
      "
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <CardContent className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
                        <span className="text-sm font-semibold">
                          {recipe.rating}
                        </span>
                      </div>

                      <h3 className="font-semibold text-lg text-stone-900 leading-tight mb-4 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {recipe.title}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 mt-auto">
                        <div className="flex items-center gap-2 bg-stone-100/70 backdrop-blur-sm border border-stone-200 p-2 rounded-xl">
                          <Clock className="w-4 h-4 text-brand-600" />
                          <span className="text-xs font-medium">
                            {recipe.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-stone-100/70 backdrop-blur-sm border border-stone-200 p-2 rounded-xl">
                          <Users className="w-4 h-4 text-brand-600" />
                          <span className="text-xs font-medium">
                            {recipe.servings} servings
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:flex">
            <CarouselPrevious className="h-12 w-12 border border-stone-200 bg-white hover:bg-brand-600 hover:text-white transition-all shadow-md" />
            <CarouselNext className="h-12 w-12 border border-stone-200 bg-white hover:bg-brand-600 hover:text-white transition-all shadow-md" />
          </div>
        </Carousel>

        {/* Mobile CTA - Only visible on small screens */}
        <div className="mt-8 text-center md:hidden">
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="w-full py-6 text-base border-stone-300"
            >
              View All Recipes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Popular;
