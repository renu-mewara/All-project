import React from "react";

const contactData = {
  hero: {
    title: "Contact Vedix",
    subtitle:
      "Let’s discuss your project and build something amazing together.",
  },
  info: {
    title: "Get in Touch",
    desc:
      "Have an idea or need a digital solution? Reach out to Vedix and our team will get back to you as soon as possible.",
    details: [
      "📍 Pali, Rajasthan, India",
      "📧 info@vedix.com",
      "📞 +91 90000 00000",
    ],
  },
  form: {
    title: "Send us a message",
    fields: [
      { type: "text", placeholder: "Your Name" },
      { type: "email", placeholder: "Your Email" },
      { type: "text", placeholder: "Subject" },
    ],
    textarea: { rows: 4, placeholder: "Your Message" },
    button: "Send Message",
  },
};

export default function Contact() {
  const { hero, info, form } = contactData;

  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-marchenda-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold">{hero.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">{hero.subtitle}</p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Left - Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {info.title}
          </h2>
          <p className="mt-4 text-gray-600">{info.desc}</p>

          <div className="mt-6 space-y-3 text-gray-700">
            {info.details.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="bg-gray-50 rounded-xl shadow p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {form.title}
          </h3>

          <form className="space-y-4">
            {form.fields.map((field, i) => (
              <input
                key={i}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}

            <textarea
              rows={form.textarea.rows}
              placeholder={form.textarea.placeholder}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {form.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
