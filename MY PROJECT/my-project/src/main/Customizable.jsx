import React from "react";
import { FaCogs, FaPalette, FaLayerGroup } from "react-icons/fa";

export default function Customizable() {
  return (
    <section className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Fully Customizable
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Tailor your website exactly to your brand, needs, and business goals
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Design That Fits Your Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              With Vedix, every element of your website can be customized —
              layouts, colors, components, and features — to perfectly match
              your business identity.
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>✅ Custom layouts & components</li>
              <li>✅ Brand-based color & theme control</li>
              <li>✅ Scalable features as your business grows</li>
            </ul>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaCogs className="text-4xl mx-auto text-indigo-500 mb-3" />
              <h4 className="font-semibold">Flexible Settings</h4>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaPalette className="text-4xl mx-auto text-purple-500 mb-3" />
              <h4 className="font-semibold">Brand Colors</h4>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaLayerGroup className="text-4xl mx-auto text-pink-500 mb-3" />
              <h4 className="font-semibold">Modular Design</h4>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16 text-center px-4">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Build Your Website Your Way
        </h3>
        <p className="text-gray-600 mb-6">
          Choose features, design, and functionality that align with your goals.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
