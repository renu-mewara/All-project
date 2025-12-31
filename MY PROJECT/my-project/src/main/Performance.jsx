import React from "react";

export default function Performance() {
  return (
    <section className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-red-600 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold">Fast Performance</h1>
        <p className="mt-4 text-lg">
          Speed-optimized solutions for modern businesses
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-4">
          Why Performance Matters?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          At Vedix, we build highly optimized applications using modern
          technologies. Fast load time improves user experience, SEO ranking,
          and conversion rate.
        </p>

        <ul className="mt-6 space-y-3 text-gray-700">
          <li>✅ Optimized React components</li>
          <li>✅ Clean & scalable backend APIs</li>
          <li>✅ Faster load & response time</li>
        </ul>
      </div>
    </section>
  );
}
