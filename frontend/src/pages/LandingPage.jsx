import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useUser } from '@/context/AuthContext'
import { FEATURES, TESTIMONIALS } from '@/utils/data'
import {
  ArrowRight,
  Clock,
  Frown,
  Leaf,
  Smile,
  Star,
  Users,
  Vegan,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const BADGE_CLASS =
  'border-green-200 text-green-500 bg-green-50 text-xs font-bold uppercase tracking-widest mb-4'

const LandingPage = () => {
  const { user } = useUser()

  return (
    <div className="min-h-screen">
      {/* hero section */}
      <section className="pt-24 pb-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* left */}
            <div className="flex-1 text-center lg:text-left">
              <Badge variant="outline" className={BADGE_CLASS}>
                #1 AI Cooking Assistant
              </Badge>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-stone-900 mb-6 leading-[1.08] tracking-tight">
                Turn your{' '}
                <span className="italic text-brand-500">leftovers</span> into{' '}
                <br />
                masterpieces.
              </h1>

              <p className="text-lg text-stone-500 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Snap a photo of your fridge. We'll tell you what to cook. Save
                money, reduce waste, and eat better tonight.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center md:justify-start">
                <Link to={user ? '/dashboard' : '/sign-in'}>
                  <Button
                    variant="primary"
                    className=" transition-transform hover:scale-105 h-12 w-full sm:w-auto text-base font-bold"
                  >
                    Start Cooking Free <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button
                    variant="outline"
                    className=" transition-transform hover:scale-105 h-12 w-full sm:w-auto text-base font-bold"
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
                  <span className="font-bold text-stone-900">10k+ cooks</span>{' '}
                  joined last month
                </p>
              </div>
            </div>

            {/* Right — recipe card */}
            <div className="flex flex-1 justify-center items-center">
              <Card className="p-0 hover:scale-105 transition-transform">
                <CardContent className="p-0">
                  <div className="relative h-full w-full">
                    <img
                      src="/pasta-dish.png"
                      alt="Rustic Tomato Basil Pasta"
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600 text-white">
                      98% Match
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-stone-900 text-3xl font-bold mb-2">
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
                      <Badge
                        variant="outline"
                        className="gap-1 border border-stone-500 bg-stone-50"
                      >
                        <Clock className="w-3 h-3" /> 25 mins
                      </Badge>

                      <Badge
                        variant="outline"
                        className="gap-1 border border-stone-500 bg-stone-50"
                      >
                        <Users className="w-3 h-3" /> 2 servings
                      </Badge>

                      <Badge
                        variant="outline"
                        className="gap-1 border border-stone-500 bg-stone-50"
                      >
                        <Vegan className="w-3 h-3" /> Vegetarian
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* problem - solution section */}
      <section className="py-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 lg:mb-14">
            <Badge variant="outline" className={BADGE_CLASS}>
              Try ChefSense
            </Badge>
            <h2 className="text-3xl sm:text-6xl font-extrabold text-stone-900">
              Stop guessing. Start cooking.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <Card className="border-red-100 bg-red-50 shadow-none">
              <CardContent className="p-7 lg:p-8">
                <h3 className="font-bold text-red-500 mb-5 flex items-center gap-2">
                  <Frown />
                  Without ChefSense
                </h3>
                <ul className="space-y-3">
                  {[
                    'Open fridge. Stare. Close fridge.',
                    'Google "recipes with eggs and sad carrots"',
                    'Scroll for 20 mins. Nothing fits.',
                    'Order pizza. Again.',
                    'Throw out ₹800 worth of groceries.',
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

            <Card className="border-green-100 bg-green-50 shadow-none">
              <CardContent className="p-7 lg:p-8">
                <h3 className="font-bold text-green-600 mb-5 flex items-center gap-2">
                  <Smile />
                  With ChefSense
                </h3>
                <ul className="space-y-3">
                  {[
                    'Snap a photo of your fridge.',
                    'AI reads exactly what you have.',
                    'Get 3 real recipes in seconds.',
                    'Cook something great in 30 mins.',
                    'Zero waste. Zero guilt.',
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

      {/* features section */}
      <section className="py-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className={BADGE_CLASS}>
              features
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-3">
              Your <span className="text-brand-500">Smart</span> Kitchen
            </h2>
            <p className="text-stone-500 text-lg">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {FEATURES.slice(0, 4).map((feature) => (
              <div
                key={feature.title}
                className="bg-stone-50 rounded-2xl p-6 flex gap-4 items-start"
              >
                <Badge className={`${BADGE_CLASS} h-12 w-12`} variant="outline">
                  <feature.icon className="w-5 h-5 text-green-600" />
                </Badge>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-stone-900">
                      {feature.title}
                    </h3>
                    {feature.limit && (
                      <span className="text-xs text-stone-400 bg-white border border-stone-200 px-2 py-0.5 rounded-full">
                        {feature.limit}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden flex flex-col sm:flex-row bg-stone-700">
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="w-10 h-10 rounded-xl bg-green-300 flex items-center justify-center mb-5">
                <Leaf className="w-5 h-5 text-green-800" />
              </div>
              <h3 className="font-extrabold text-white text-2xl mb-2">
                Zero waste, every time
              </h3>
              <p className="text-stone-200 text-sm leading-relaxed max-w-sm mb-8">
                ChefSense always prioritizes ingredients closest to expiry. Cook
                smarter, waste less, save money every week.
              </p>
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-3xl font-extrabold text-white">₹1500</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    saved per week
                  </p>
                </div>
                <div className="w-px h-10 bg-stone-700" />
                <div>
                  <p className="text-3xl font-extrabold text-white">30%</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    less food wasted
                  </p>
                </div>
                <div className="w-px h-10 bg-stone-700" />
                <div>
                  <p className="text-3xl font-extrabold text-white">10k+</p>
                  <p className="text-xs text-stone-500 mt-0.5">happy cooks</p>
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1543353071-873f17a7a088?w=700&auto=format&fit=crop"
              alt="Zero waste cooking"
              className="w-full sm:w-129 h-56 sm:h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* steps section */}
      <Separator />

      <section className="py-20 px-5 sm:px-10 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className={BADGE_CLASS}>
            how it works
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 mb-6">
            From Photo to Feast in{' '}
            <span className="text-brand-500">4 Steps</span>
          </h2>
          <Link to="/how-it-works">
            <Button
              variant="primary"
              className="gap-2 w-fit px-6 h-12 text-base font-bold rounded-full hover:scale-105 transition-transform"
            >
              See How It Works <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
      <Separator />
      {/* Testimonials */}
      <section className="py-20 px-5 sm:px-10 lg:px-16 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 lg:mb-14">
            <Badge variant="outline" className={BADGE_CLASS}>
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-6xl font-extrabold text-stone-900">
              What our <span className="text-brand-500">chefs</span> say
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.name}
                className="hover:scale-105 transition-transform"
              >
                <CardContent>
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-5 sm:px-10 lg:px-16 bg-stone-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-600 text-sm font-bold uppercase tracking-widest mb-4">
            Zero Waste · Zero Stress
          </p>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-black leading-tight mb-5">
            Your next great meal is{' '}
            <span className="text-brand-600">already in your fridge.</span>
          </h2>

          <p className="text-stone-600 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            Scan your pantry, let AI do the thinking, and cook something amazing
            tonight — without wasting food or money.
          </p>

          <Link to={user ? '/dashboard' : '/sign-in'}>
            <Button
              variant="primary"
              className="h-12 px-8 w-fit text-base font-bold gap-2 hover:scale-105 transition-transform"
            >
              Scan Your Pantry
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <p className="mt-5 text-sm text-stone-500">
            No credit card · Takes less than 30 seconds
          </p>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
