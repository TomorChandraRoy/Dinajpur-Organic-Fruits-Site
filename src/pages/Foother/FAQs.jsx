import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import faqsData from "../../utils/data/faqsData.json";

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
        <span className="font-medium text-slate-900">{item.question}</span>

        <FaChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Answer */}
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-slate-600">{item.answer}</div>
      )}
    </div>
  );
};

/* =========================
   Main Component
========================= */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { heading, faqs } = faqsData;

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">{heading.title}</h2>
          <p className="text-slate-600 mt-2">{heading.subtitle}</p>
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
};
export default FAQ;
