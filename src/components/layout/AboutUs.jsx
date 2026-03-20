
import { Leaf, ShieldCheck, Truck, Users } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#1b2d24] py-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
            Our Story of Purity
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Bringing the authentic taste of Dinajpur’s finest organic fruits directly to your doorstep.
            We believe in food that is safe, healthy, and 100% natural.
          </p>
        </div>
        {/* Decorative leaf shape or overlay can go here */}
      </section>

      {/* Main Content - Image & Text */}
      <section className="py-16 px-6 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800"
              alt="Organic Orchard"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <span className="text-green-700 font-bold uppercase tracking-widest text-sm">Since 2024</span>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#1b2d24] mt-2 mb-6">
              Rooted in the Soil of Dinajpur
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Dinajpur Organic Fruits started with a simple mission: to bridge the gap between hardworking farmers and health-conscious families. We noticed that finding truly organic, chemical-free fruits in the city was becoming a challenge.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we partner with local orchards in Dinajpur to ensure that every mango, litchi, and seasonal fruit we deliver meets the highest standards of purity. No formaline, no artificial ripening—just nature’s best.
            </p>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#1b2d24]">100% Organic</h3>
              <p className="text-sm text-gray-500">Certified Purity</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                <Truck size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#1b2d24]">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Across Bangladesh</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                <Leaf size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#1b2d24]">Natural Growth</h3>
              <p className="text-sm text-gray-500">No Chemicals</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                <Users size={28} />
              </div>
              <h3 className="font-bold text-xl text-[#1b2d24]">5k+ Clients</h3>
              <p className="text-sm text-gray-500">Happy Families</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 max-w-[1280px] mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#1b2d24] mb-8">Our Vision</h2>
          <blockquote className="text-2xl italic text-gray-700 leading-snug border-l-4 border-green-600 pl-6 text-left">
            "To become the most trusted platform for organic produce in Bangladesh, ensuring that every household has access to food that nourishes both the body and the soul."
          </blockquote>
          <p className="mt-8 text-gray-500">— Team Dinajpur Organic Fruits</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;