import farmImage from '../../assets/1.png';
import mangoGarden from '../../assets/1.webp';
import sortedMangoes from '../../assets/3.webp';
import productPackage from '../../assets/4.webp';

export const weAreDifferent = {
  hero: {
    image: farmImage,
    title: "Registered Safe Garden",
    subtitle: "01",
    text: "We collect fruits from our registered & harmful-chemical free fruit gardens.",
  },
  video: {
    // এখানে ইউটিউব ভিডিওর ইউআরএল বা আইডি দিতে হবে
    id: "wK9yVSkVZQU", // উদাহরণ: your youtube video id
    thumbnail: "https://youtu.be/wK9yVSkVZQU?si=6-c6YQrmF5BnOrGf", // বা চাইলে লোকাল ইমেজও দেয়া যাবে
    // আপনি এখানে সরাসরি ইউটিউব ভিডিও প্লেয়ার অ্যাড করার জন্য অন্য ব্যবস্থাও করতে পারেন।
    // এই মুহূর্তে একটি ভিডিও স্টাইল এলিমেন্ট ব্যবহার করা হয়েছে।
  },
  features: [
    {
      id: "04",
      image: mangoGarden,
      title: "Garden Fresh Delivery",
      text: "We take pre-orders from customers and deliver quicker direct from garden to table.",
    },
    {
      id: "02",
      image: sortedMangoes,
      title: "Premium Quality Product",
      text: "We only select and sort premium standards fruits for your best experience.",
    },
    {
      id: "03",
      image: productPackage,
      title: "Premium Packaging",
      text: "Maybe you want to gift yourself, your family, your colleague the best packaged one.",
    },
  ],
  stats: [
    { value: "50K+", label: "Happy Customers" },
    { value: "50+", label: "Registered Garden" },
    { value: "100%", label: "Quality Assured" },
    { value: "42-72H", label: "Estimated Delivery Time" },
  ],
};