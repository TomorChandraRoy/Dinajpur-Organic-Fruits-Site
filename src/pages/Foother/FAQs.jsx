import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

/* =========================
   FAQ Data (Dynamic)
========================= */
const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We provide web development, UI/UX design, and full-stack solutions tailored to your business needs.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact us through our contact form or email us at support@example.com.",
  },
  {
    question: "Do you offer custom solutions?",
    answer:
      "Yes, we specialize in custom-built applications based on your requirements.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern technologies like React, Node.js, Tailwind CSS, and more.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Project timelines vary depending on complexity, but we always aim for timely delivery.",
  },
];

/* =========================
   FAQ Item Component
========================= */
const FAQItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-md">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-4 text-left"
      >
        <span className="font-medium text-slate-900">
          {item.question}
        </span>

        <FaChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-slate-600">
          {item.answer}
        </div>
      )}
    </div>
  );
};

/* =========================
   Main Component
========================= */
const FAQ =() =>{
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-2">
            Find answers to common questions below.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
export default  FAQ;