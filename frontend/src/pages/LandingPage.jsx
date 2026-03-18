import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FEATURES, STEPS, TESTIMONIALS } from "@/utils/data";
import {
  ArrowRight,
  Clock,
  Frown,
  Smile,
  Star,
  Users,
  Vegan,
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className=" min-h-screen">
      {/* hero sectiom  */}
      <section className=" pt-24 pb-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* left */}
            <div className="flex-1 text-center lg:text-left">
              <Badge
                variant="outline"
                className="border-brand-200 text-brand-500 bg-brand-50 text-xs font-bold uppercase tracking-widest mb-4"
              >
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-stone-900 mb-6 leading-[1.08] tracking-tight">
                Turn your{" "}
                <span className="italic text-brand-500">leftovers</span> into{" "}
                <br />
                masterpieces.
              </h1>

              <p className="text-lg text-stone-500 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Snap a photo of your fridge. We'll tell you what to cook. Save
                money, reduce waste, and eat better tonight.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center md:justify-start">
                <Link to="/dashboard">
                  <Button
                    variant="primary"
                    className="flex items-center gap-2 cursor-pointer hover:bg-brand-600 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 h-12 w-full sm:w-auto text-base font-bold  "
                  >
                    Start Cooking Free <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 h-12 w-full sm:w-auto text-base font-bold  "
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>

              {/* Social proof avatars */}
              <div className="mt-10 flex items-center gap-3 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {TESTIMONIALS.map((testimonial) => (
                    <Avatar
                      key={testimonial.avatar}
                      className="w-10 h-10 border-2 border-white"
                    >
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="object-cover"
                      />
                      <AvatarFallback>{testimonial.fallback}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <p className="text-base text-stone-500">
                  <span className="font-bold text-stone-900">10k+ cooks</span>{" "}
                  joined last month
                </p>
              </div>
            </div>

            {/* Right — recipe card */}
            <div className="flex flex-1 justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="w-full max-w-[400px] lg:max-w-[460px] rounded-2xl overflow-hidden bg-white shadow-xl border border-stone-100">
                <div className="relative">
                  <img
                    src="/pasta-dish.png"
                    alt="Rustic Tomato Basil Pasta"
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    98% Match
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-stone-900 text-3xl font-bold mb-2 ">
                    Rustic Tomato Basil Pasta
                  </h3>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                      />
                    ))}
                    <span className="text-stone-400 text-xs ml-1">
                      5.0 · 124 reviews
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1 text-stone-500 text-xs bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> 25 mins
                    </span>
                    <span className="flex items-center gap-1 text-stone-500 text-xs bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-full">
                      <Users className="w-3 h-3" /> 2 servings
                    </span>
                    <span className="flex items-center gap-1 text-stone-500 text-xs bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-full">
                      <Vegan className="w-3 h-3" /> Vegetarian
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* problem - solution section  */}
      <section className="py-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-14">
            <h2 className="text-3xl sm:text-6xl font-extrabold text-stone-900">
              Stop guessing. Start cooking.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <Card className="border-red-100 bg-red-50 shadow-none hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
              <CardContent className="p-7 lg:p-8">
                <h3 className="font-bold text-red-500 mb-5 flex items-center gap-2">
                  <Frown />
                  Without ChefSense
                </h3>
                <ul className="space-y-3">
                  {[
                    "Open fridge. Stare. Close fridge.",
                    'Google "recipes with eggs and sad carrots"',
                    "Scroll for 20 mins. Nothing fits.",
                    "Order pizza. Again.",
                    "Throw out ₹800 worth of groceries.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-stone-600 text-sm"
                    >
                      <span className="text-red-400 font-bold mt-0.5">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-100 bg-green-50 shadow-none hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer">
              <CardContent className="p-7 lg:p-8">
                <h3 className="font-bold text-green-600 mb-5 flex items-center gap-2">
                  <Smile />
                  With ChefSense
                </h3>
                <ul className="space-y-3">
                  {[
                    "Snap a photo of your fridge.",
                    "AI reads exactly what you have.",
                    "Get 3 real recipes in seconds.",
                    "Cook something great in 30 mins.",
                    "Zero waste. Zero guilt.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-stone-600 text-sm"
                    >
                      <span className="text-green-500 font-bold mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* demo section  */}
      <section className="py-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="outline"
            className="border-brand-200 text-brand-500 bg-brand-50 text-xs font-bold uppercase tracking-widest mb-4"
          >
            See It In Action
          </Badge>

          <h2 className="text-3xl sm:text-6xl font-extrabold text-stone-900 mb-3">
            Fridge photo to recipe <br />
            <span className="text-brand-500">in seconds.</span>
          </h2>
          <p className="text-stone-500 text-lg mb-12 max-w-xl mx-auto">
            No setup. No subscriptions. Just snap and cook.
          </p>

          <Card className="mx-auto max-w-3xl shadow-xl border-stone-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-stone-50 border-b border-stone-100">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 bg-white border border-stone-200 rounded-md px-3 py-1 text-xs text-stone-400 text-left">
                chefsense.app/dashboard
              </div>
            </div>
            <CardContent className="p-0">
              <div className="w-full h-80 sm:h-96 bg-white flex flex-col items-center justify-center gap-3">
                <img src="/dashboard.png" alt="dashboard screenshot" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* steps section  */}
      <section className="py-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-14">
            <Badge
              variant="outline"
              className="border-brand-200 text-brand-500 bg-brand-50 text-xs font-bold uppercase tracking-widest mb-4"
            >
              how it works
            </Badge>
            <h2 className="text-3xl sm:text-6xl font-extrabold text-stone-900">
              From Photo to Feast in{" "}
              <span className="text-brand-500">3 Steps</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="bg-white border border-stone-100 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform"
              >
                <div
                  className="h-1"
                  style={{ background: ["#B5D4F4", "#9FE1CB", "#FAC775"][i] }}
                />
                <div className="flex flex-col items-center gap-3 p-6 text-center">
                  <span className="text-xs uppercase tracking-widest text-stone-400">
                    Step {i + 1}
                  </span>
                  <img
                    src={step.img}
                    alt={step.alt}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <h3 className="text-lg font-semibold text-stone-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* features section  */}
      <section className="py-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
            <Badge
              variant="outline"
              className="border-brand-200 text-brand-500 bg-brand-50 text-xs font-bold uppercase tracking-widest mb-4"
            >
              features
            </Badge>
            <h2 className="text-3xl sm:text-6xl font-extrabold text-stone-900 mb-4">
              Your <span className="text-brand-500">Smart </span>Kitchen
            </h2>
            <p className="text-stone-500 text-lg">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 bg-white border border-stone-100 rounded-2xl hover:-translate-y-0.5 transition-transform"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h3 className="font-semibold text-stone-900">
                      {feature.title}
                    </h3>
                    <span className="text-xs text-stone-400">
                      {feature.limit}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials  */}
      <section className="py-20 px-5 sm:px-10 lg:px-16 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 lg:mb-14">
            <Badge
              variant="outline"
              className="border-brand-200 text-brand-500 bg-brand-50 text-xs font-bold uppercase tracking-widest mb-4"
            >
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-6xl font-extrabold text-stone-900">
              What our <span className="text-brand-500">chefs</span> say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-stone-600 text-sm mb-5 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
                <Separator className="mb-5" />
                <div className="flex items-center gap-2.5">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={t.avatar}
                      alt={t.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-stone-900 font-semibold text-sm">
                    {t.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section  */}

      <section className="py-20 px-5 sm:px-10">
        <div className="max-w-3xl mx-auto bg-white border border-stone-100 rounded-2xl px-8 sm:px-16 py-14 text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            Your next great meal is
            <span className="text-brand-600"> already in your fridge.</span>
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Scan your pantry, let AI do the thinking, and cook something amazing
            tonight — without wasting food or money.
          </p>
          <Link to="/dashboard">
            <Button
              variant="primary"
              className="h-12 px-6 text-base font-semibold gap-2 hover:scale-105 transition-transform"
            >
              Scan Your Pantry Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <p className="mt-5 text-sm text-stone-400">
            No credit card required · Takes less than 30 seconds
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
