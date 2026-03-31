import RecipeCard from "@/components/RecipeCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FEATURES,
  STATS,
  TESTIMONIALS,
  WITHOUT_CHEFSENSE,
  WITH_CHEFSENSE,
  recipe,
} from "@/lib/siteContent";
import { ArrowRight, Frown, Leaf, Smile, Star } from "lucide-react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row  items-center justify-between gap-10">
          {/* Left Column: Text & CTA */}
          <div className="flex-1 text-center w-full ">
            <p className="text-sm font-bold uppercase  text-brand-500 mb-3 sm:mb-4">
              Best AI Cooking Assistant
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl  font-extrabold  mb-5 sm:mb-6 ">
              Turn your <span className="italic text-brand-500">leftovers</span>{" "}
              into <br className="hidden sm:block" />
              masterpieces.
            </h1>

            <p className="text-lg  text-stone-500 mb-8 ">
              Snap a photo of your fridge. We'll tell you what to cook. Save
              money, reduce waste, and eat better tonight.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch  justify-center">
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  className="h-12 w-full sm:w-auto  font-bold"
                >
                  Start Cooking Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  className="h-12  w-full sm:w-auto font-bold"
                >
                  See How It Works
                </Button>
              </Link>
            </div>

            <div className="mt-10 sm:mt-12 flex sm:flex-row  gap-3 sm:gap-4 justify-center items-center">
              <div className="flex">
                {TESTIMONIALS.map((testimonial) => (
                  <Avatar key={testimonial.name} className="w-10 h-10">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt="avatar"
                      className="object-cover"
                    />
                  </Avatar>
                ))}
              </div>
              <p className="text-sm sm:text-base text-stone-500 mt-2 sm:mt-0">
                <span className="font-bold ">10k+ cooks</span> joined last month
              </p>
            </div>
          </div>

          {/* Right Column: Recipe Card */}
          <div className="w-full max-w-7xl flex justify-center  flex-1">
            <div className="w-full max-w-80 sm:max-w-sm relative ">
              <RecipeCard recipe={recipe} />
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* problem - solution section */}
      <section className="py-20 px-6  ">
        <div className="max-w-5xl mx-auto">
          {/* header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase  text-brand-500">
              Try ChefSense
            </p>

            <h2 className="text-4xl sm:text-6xl font-extrabold  mt-4">
              Stop guessing.
              <br />
              <span className="text-brand-500">Start cooking.</span>
            </h2>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* without */}
            <Card className="border border-red-100 bg-red-50 p-7 lg:p-8 transition-all  hover:shadow-xl hover:bg-red-100 hover:-translate-y-1">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <Frown className="text-red-600 w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-red-600 text-lg">
                    Without ChefSense
                  </h3>
                </div>

                <ul className="space-y-3">
                  {WITHOUT_CHEFSENSE.map((item) => (
                    <li key={item} className="flex items-start gap-3  text-sm ">
                      <span className="text-red-600 mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* with */}
            <Card className="border border-green-100 bg-green-50 p-7 lg:p-8 transition-all  hover:shadow-xl hover:bg-green-100 hover:-translate-y-1">
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Smile className="text-green-600 w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-green-700 text-lg">
                    With ChefSense
                  </h3>
                </div>

                <ul className="space-y-3">
                  {WITH_CHEFSENSE.map((item) => (
                    <li key={item} className="flex items-start gap-3  text-sm ">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* features section */}
      <section className="py-20 px-6 ">
        <div className="max-w-6xl mx-auto">
          {/* header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase  text-brand-500">
              Features
            </p>

            <h2 className="text-4xl sm:text-5xl font-extrabold  mt-3">
              Your <span className="text-brand-500">Smart</span> Kitchen
            </h2>

            <p className="text-stone-500 text-lg mt-4 max-w-xl mx-auto">
              Everything you need to master your meal prep effortlessly.
            </p>
          </div>

          {/* feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-6 flex gap-4 hover:shadow-lg"
                >
                  <div className="border px-2 py-2 w-fit rounded-full bg-stone-50 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{feature.title}</h3>

                      {feature.limit && (
                        <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                          {feature.limit}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-stone-500 ">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* highlight card */}
          <div className=" overflow-hidden rounded-3xl flex flex-col lg:flex-row bg-stone-800 ">
            {/* left content */}
            <div className="flex-1 p-10 flex flex-col justify-center">
              <div className="px-4 py-4  rounded-full w-fit bg-green-400/20 mb-6 ">
                <Leaf className="w-6 h-6 text-green-300" />
              </div>

              <h3 className="font-extrabold text-white text-3xl mb-3">
                Zero waste, every time
              </h3>

              <p className="text-stone-300 text-sm max-w-md mb-10">
                ChefSense prioritizes ingredients close to expiry — helping you
                cook smarter, reduce waste, and save money every week.
              </p>

              {/* stats */}
              <div className="flex flex-wrap items-center gap-8">
                {STATS.map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-extrabold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* image */}
            <div className="relative lg:w-[45%] h-64 lg:h-auto">
              <img
                src="/statsimg.png"
                alt="Zero waste cooking"
                loading="lazy"
                className="w-full h-full object-cover"
              />

              {/* overlay */}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* header */}
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase  text-brand-500">
              Testimonials
            </p>

            <h2 className="text-4xl sm:text-6xl font-extrabold  mt-4">
              What our <span className="text-brand-500">chefs</span> say
            </h2>
          </div>

          {/* testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="  p-6 hover:shadow-lg transition">
                <div className="relative">
                  {/* stars */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* quote */}
                  <p className="text-stone-700 text-sm mb-6">
                    <span className="text-2xl text-stone-300 ">“</span>
                    {t.text}
                    <span className="text-2xl text-stone-300 ">”</span>
                  </p>

                  {/* user */}
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 ">
                      <AvatarImage
                        src={t.avatar}
                        alt={t.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className=" font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-stone-400">Home Cook</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA section */}
      <section className="py-20 px-6">
        <Card className="max-w-3xl mx-auto  text-center p-10  bg-stone-50 hover:shadow-lg transition">
          <p className="text-brand-600  text-sm font-bold uppercase mb-4">
            Zero Waste · Zero Stress
          </p>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-black  mb-5">
            Your next great <span className="text-brand-600">Meal</span> is
            already in your <span className="text-brand-600">Fridge.</span>
          </h2>

          <p className="text-stone-600 text-lg mb-10  max-w-xl mx-auto">
            Scan your pantry, let AI do the thinking, and cook something amazing
            tonight — without wasting food or money.
          </p>

          <Link to="/dashboard">
            <Button
              variant="primary"
              className="px-8 py-5  w-fit  font-bold gap-2 "
            >
              Scan Your Pantry
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <p className="mt-5 text-sm text-stone-500">
            No credit card · Takes less than 30 seconds
          </p>
        </Card>
      </section>
    </div>
  );
}

export default LandingPage;
