import React from "react";

const aboutData = {
  hero: {
    title: "About Vedix",
    subtitle:
      "Empowering businesses with smart digital solutions and modern technology.",
  },
  whoWeAre: {
    title: "Who We Are",
    desc1:
      "Vedix is a growing IT company focused on delivering high-quality web development and digital solutions. We help startups and businesses build strong online presence with modern technologies.",
    desc2:
      "Our mission is to provide reliable, scalable and user-friendly solutions that bring real value to our clients.",
  },
  whyChoose: {
    title: "Why Choose Vedix?",
    points: [
      "Skilled Full Stack Developers",
      "Modern Tech Stack (MERN)",
      "Client-focused Approach",
      "Affordable Pricing",
      "On-time Delivery",
    ],
  },
  visionMission: [
    {
      title: "Our Vision",
      text:
        "To become a trusted IT partner for businesses by delivering innovative and impactful digital solutions.",
    },
    {
      title: "Our Mission",
      text:
        "To empower clients with technology that helps them grow, compete, and succeed in the digital world.",
    },
  ],
};

export default function Aboutus() {
  const { hero, whoWeAre, whyChoose, visionMission } = aboutData;

  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold">{hero.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">{hero.subtitle}</p>
      </div>

      {/* About Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            {whoWeAre.title}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {whoWeAre.desc1}
          </p>
          <p className="mt-3 text-gray-600 leading-relaxed">
            {whoWeAre.desc2}
          </p>
        </div>

        {/* Right */}
        <div className="bg-gray-50 rounded-xl shadow p-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            {whyChoose.title}
          </h3>
          <ul className="mt-4 space-y-3 text-gray-600">
            {whyChoose.points.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {visionMission.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
