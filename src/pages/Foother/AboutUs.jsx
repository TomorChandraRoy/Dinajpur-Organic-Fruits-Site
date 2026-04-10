import { BiUser } from "react-icons/bi";
import { BsShieldCheck, BsTruck } from "react-icons/bs";
import { LuEar } from "react-icons/lu";
import aboutUsData from "../../utils/data/aboutUsData.json";

const AboutUs = () => {
  const { hero, story, features, vision } = aboutUsData;

  const icons = {
    organic: <BsShieldCheck size={28} />,
    delivery: <BsTruck size={28} />,
    growth: <LuEar size={28} />,
    clients: <BiUser size={28} />,
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#1b2d24] py-20 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            {hero.description}
          </p>
        </div>
        {/* Decorative leaf shape or overlay can go here */}
      </section>

      {/* Main Content - Image & Text */}
      <section className="py-16 px-6 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={story.image}
              alt="Organic Orchard"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div>
            <span className="text-green-700 font-bold uppercase tracking-widest text-sm">
              {story.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#1b2d24] mt-2 mb-6">
              {story.title}
            </h2>
            {story.paragraphs.map((p, index) => (
              <p
                key={index}
                className={`text-gray-600 leading-relaxed ${index < story.paragraphs.length - 1 ? "mb-6" : ""}`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                  {icons[feature.id]}
                </div>
                <h3 className="font-bold text-xl text-[#1b2d24]">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 max-w-[1280px] mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#1b2d24] mb-8">
            {vision.title}
          </h2>
          <blockquote className="text-2xl italic text-gray-700 leading-snug border-l-4 border-green-600 pl-6 text-left">
            {vision.quote}
          </blockquote>
          <p className="mt-8 text-gray-500">{vision.author}</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
