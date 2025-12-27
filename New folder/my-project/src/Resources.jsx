import React from "react";

const resourcesData = {
  hero: {
    title: "Vedix Resources",
    subtitle:
      "Learn, grow, and explore useful resources to build better digital solutions.",
  },
  list: [
    {
      title: "Web Development",
      desc: "HTML, CSS, JavaScript, React, and modern frameworks tutorials.",
    },
    {
      title: "Backend & APIs",
      desc: "Node.js, Express, REST APIs, authentication and databases.",
    },
    {
      title: "UI/UX & Design",
      desc: "Tailwind CSS, responsive layouts, and modern UI practices.",
    },
    {
      title: "Projects",
      desc: "Real-world project ideas and code samples for practice.",
    },
    {
      title: "Interview Prep",
      desc: "Common questions and tips to crack developer interviews.",
    },
    {
      title: "Tools & Docs",
      desc: "Useful tools, libraries, and official documentation links.",
    },
  ],
};

export default function Resources() {
  const { hero, list } = resourcesData;

  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold">{hero.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">{hero.subtitle}</p>
      </div>

      {/* Resources List */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        {list.map((item, i) => (
          <div
            key={i}
            className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
