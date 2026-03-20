import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

/* =========================
   Contact Data (Dynamic)
========================= */
const contactInfo = [
  {
    icon: "location",
    text: "Dhaka, Bangladesh",
    color: "text-blue-600",
  },
  {
    icon: "phone",
    text: "+880 1234 567890",
    color: "text-green-600",
  },
  {
    icon: "email",
    text: "contact@example.com",
    color: "text-red-500",
  },
];

/* =========================
   Icon Map
========================= */
const iconMap = {
  location: FaMapMarkerAlt,
  phone: FaPhoneAlt,
  email: FaEnvelope,
};

/* =========================
   Reusable Contact Item
========================= */
const ContactItem = ({ item }) => {
  const Icon = iconMap[item.icon];

  return (
    <div className="flex items-center gap-3">
      <Icon className={`${item.color} text-lg`} />
      <span>{item.text}</span>
    </div>
  );
};

/* =========================
   Main Component
========================= */
const ContactUs= () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // API call later
    alert("Message sent!");
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Contact Us
          </h2>
          <p className="text-slate-600 mt-2">
            Have any questions? We'd love to hear from you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Left: Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              Get in Touch
            </h3>

            <p className="text-slate-600 mb-6">
              Feel free to reach out via form or contact details below.
            </p>

            {/* Dynamic Contact Items */}
            <div className="space-y-4 text-sm text-slate-700">
              {contactInfo.map((item, index) => (
                <ContactItem key={index} item={item} />
              ))}
            </div>

            {/* Map */}
            <div className="mt-6">
              <iframe
                title="map"
                className="w-full h-48 rounded-md"
                src="https://maps.google.com/maps?q=dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-slate-900">
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Message */}
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
export default ContactUs;