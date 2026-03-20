
import {
  FaLock,
  FaEye,
  FaFileAlt,
  FaShareAlt,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "collection",
      title: "Information Collection",
      icon: <FaFileAlt className="text-green-700 text-xl" />,
    },
    {
      id: "usage",
      title: "Usage of Data",
      icon: <FaEye className="text-green-700 text-xl" />,
    },
    {
      id: "security",
      title: "Data Protection",
      icon: <FaLock className="text-green-800 text-xl" />,
    },
    {
      id: "third-party",
      title: "Third Party Sharing",
      icon: <FaShareAlt className="text-green-700 text-xl" />,
    },
  ];

  return (
    <div className="bg-white min-h-screen scroll-smooth">

      {/* HERO */}
      <section className="bg-[#1b2d24] py-16 px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">

          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <FaShieldAlt className="text-green-400 text-2xl" />
          </div>

          <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold mb-4">
            Privacy Policy
          </h1>

          <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
            Your privacy is as important to us as the purity of our fruits.
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* SIDEBAR */}
          <div className="hidden lg:block sticky top-10 h-fit space-y-4">
            <h4 className="font-bold text-[#1b2d24] uppercase text-xs tracking-widest mb-6 border-b pb-2">
              Sections
            </h4>

            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-sm text-gray-500 hover:text-green-700 transition border-l-2 border-gray-100 pl-4 py-2 hover:border-green-700 hover:bg-green-50/50"
              >
                {section.title}
              </a>
            ))}
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-16 text-gray-600 leading-relaxed">

            {/* COLLECTION */}
            <div id="collection" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                {sections[0].icon}
                <h2 className="text-2xl font-bold text-[#1b2d24]">
                  {sections[0].title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  "Name & Contact Number",
                  "Delivery Address",
                  "Email Address",
                  "Order History",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-2"
                  >
                    <FaCheck className="text-green-600" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* USAGE */}
            <div id="usage" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                {sections[1].icon}
                <h2 className="text-2xl font-bold text-[#1b2d24]">
                  {sections[1].title}
                </h2>
              </div>

              <p className="text-[15px]">
                Your data is used to coordinate with delivery partners and send order updates to ensure smooth delivery.
              </p>
            </div>

            {/* SECURITY */}
            <div
              id="security"
              className="scroll-mt-20 bg-green-50 p-8 rounded-2xl border border-green-100 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {sections[2].icon}
                <h2 className="text-2xl font-bold text-[#1b2d24]">
                  {sections[2].title}
                </h2>
              </div>

              <p className="text-green-900/80 text-[15px]">
                We use secure encryption for all transactions. Your sensitive data is never stored or shared.
              </p>
            </div>

            {/* THIRD PARTY */}
            <div id="third-party" className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                {sections[3].icon}
                <h2 className="text-2xl font-bold text-[#1b2d24]">
                  {sections[3].title}
                </h2>
              </div>

              <p className="text-[15px]">
                We never sell your data. We only share necessary information with trusted delivery partners.
              </p>
            </div>

            {/* FOOTER NOTE */}
            <div className="pt-10 border-t border-gray-100">
              <p className="text-sm italic text-center text-gray-400">
                Last updated: March 20, 2026 <br />
                support: dinajpurfreshfruitsbd@gmail.com
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;