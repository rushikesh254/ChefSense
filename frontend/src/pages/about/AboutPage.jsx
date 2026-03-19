const AboutPage = () => {
  return (
    <div className="min-h-screen py-20 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            We're on a mission to <br />
            <span className="text-brand-600">eliminate food waste.</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            We believe that great cooking shouldn't be complicated, and it
            definitely shouldn't result in wasted food.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=736&auto=format&fit=crop"
              alt="Cooking together"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
              Why ChefSense ?
            </h2>
            <p className="text-stone-600 mb-5 leading-relaxed">
              Every year, billions of tons of food go to waste simply because we
              don't know what to do with the ingredients we have.
            </p>
            <p className="text-stone-600 leading-relaxed">
              ChefSense uses advanced AI to bridge the gap between your pantry
              and your plate. We help you save money, discover new flavors, and
              make the most of what you already own.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
