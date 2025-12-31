import React from "react";
import { FaRocket, FaMobileAlt, FaPalette } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  // Hero data
  const hero = {
    title: "Welcome to Vedix IT Solutions",
    subtitle: "Innovative IT solutions to empower your business",
    bg: "https://images.unsplash.com/photo-1581090700227-0c1a5f6233b3?auto=format&fit=crop&w=1950&q=80",
  };

  // Cards data
  const features = [
    {
      id: 1,
      title: "Fast Performance",
      desc: "Optimized code ensures your website and apps run blazing fast.",
      icon: <FaRocket className="mx-auto text-blue-600 text-5xl mb-4" />,
      link: "/performance",
    },
    {
      id: 2,
      title: "Responsive Design",
      desc: "Looks perfect on mobile, tablet, and desktop devices.",
      icon: <FaMobileAlt className="mx-auto text-green-500 text-5xl mb-4" />,
      link: "/responsive",
    },
    {
      id: 3,
      title: "Customizable",
      desc: "Easily modify colors, fonts, and layouts to match Vedix branding.",
      icon: <FaPalette className="mx-auto text-pink-500 text-5xl mb-4" />,
      link: "/customizable",
    },
  ];

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${hero.bg}')` }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {hero.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8">
            {hero.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="px-8 py-4 border border-white text-white rounded-lg font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURES / CARDS ================= */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="p-8 bg-white border rounded-xl shadow-lg hover:shadow-2xl transition block"
            >
              {item.icon}
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-24 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Grow Your Business with Vedix?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Contact us today and let our IT solutions empower your company.
        </p>

        <Link
          to="/contact"
          className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
};

export default Home;
