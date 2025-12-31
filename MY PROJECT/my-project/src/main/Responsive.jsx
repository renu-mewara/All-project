import React from "react";
import { FaMobileAlt, FaTabletAlt, FaDesktop } from "react-icons/fa";

export default function Responsive() {
  return (
    <section className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Responsive Design
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Seamless user experience across mobile, tablet, and desktop devices
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Why Responsive Design Matters
            </h2>
            <p className="text-gray-600 leading-relaxed">
              In today’s digital world, users access websites from multiple
              devices. Vedix ensures your website adapts perfectly to every
              screen size, providing a smooth and consistent experience.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>✅ Better user experience</li>
              <li>✅ Improved SEO ranking</li>
              <li>✅ Higher engagement & conversions</li>
            </ul>
          </div>

          {/* Right */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaMobileAlt className="text-4xl mx-auto text-green-500 mb-3" />
              <h4 className="font-semibold">Mobile</h4>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaTabletAlt className="text-4xl mx-auto text-teal-500 mb-3" />
              <h4 className="font-semibold">Tablet</h4>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaDesktop className="text-4xl mx-auto text-blue-600 mb-3" />
              <h4 className="font-semibold">Desktop</h4>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 py-16 text-center px-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Want a Fully Responsive Website?
        </h3>
        <p className="text-gray-600 mb-6">
          Let Vedix design a responsive and modern solution for your business.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
