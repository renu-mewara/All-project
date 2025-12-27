import React from "react";
import {
  FaFacebookF,
  FaDiscord,
  FaTwitter,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

const footerLinks = [
  {
    title: "Resources",
    links: [
      { name: "Blog", url: "#" },
      { name: "Tailwind CSS", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { name: "GitHub", url: "#", icon: <FaGithub /> },
      { name: "Discord", url: "#", icon: <FaDiscord /> },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "#" },
      { name: "Terms & Conditions", url: "#" },
    ],
  },
];

const socialLinks = [
  { icon: <FaFacebookF />, url: "#", className: "hover:text-blue-500" },
  { icon: <FaDiscord />, url: "#", className: "hover:text-blue-400" },
  { icon: <FaTwitter />, url: "#", className: "hover:text-blue-300" },
  { icon: <FaGithub />, url: "#", className: "hover:text-gray-400" },
  { icon: <FaDribbble />, url: "#", className: "hover:text-pink-500" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-6 lg:p-8">
        <div className="md:flex md:justify-between md:items-start">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center gap-2">
              <img
                src="https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Vedix Logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold">Vedix</span>
            </a>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 text-sm font-semibold uppercase">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        className="hover:underline flex items-center gap-2"
                      >
                        {link.icon && link.icon}
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

        {/* Bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © 2025{" "}
            <a href="#" className="hover:underline font-semibold">
              Vedix™
            </a>
            . All Rights Reserved.
          </span>

          <div className="flex mt-4 sm:mt-0 gap-5">
            {socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className={`${item.className} transition`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
