import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Team() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("user_login");
    if (!token) {
      navigate("/login"); // agar login nahi hai to login page par bhej do
    }
  }, [navigate]);

  const team = [
    {
      name: "Renu Mewara",
      role: "Founder & Full Stack Developer",
      img: "https://media.istockphoto.com/id/2042526830/photo/successful-businesswoman-using-laptop-working-in-office-business-technology-corporate-concept.jpg?s=612x612&w=0&k=20&c=-NJyxcMesUAKzzPwoHXC10ZuBHPGa1dRp1gFl2T37o8=",
    },
    {
      name: "Aman Sharma",
      role: "Frontend Developer",
      img: "https://img.freepik.com/free-photo/portrait-cute-smiling-boy-cafe_23-2148436234.jpg",
    },
    {
      name: "Neha Verma",
      role: "Backend Developer",
      img: "https://media.istockphoto.com/id/2042526830/photo/successful-businesswoman-using-laptop-working-in-office-business-technology-corporate-concept.jpg?s=612x612&w=0&k=20&c=-NJyxcMesUAKzzPwoHXC10ZuBHPGa1dRp1gFl2T37o8=",
    },
    {
      name: "Rahul Singh",
      role: "UI/UX Designer",
      img: "https://img.freepik.com/free-photo/portrait-cute-smiling-boy-cafe_23-2148436234.jpg",
    },
  ];

  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-green-600 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold">Our Team</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Meet the people behind Vedix who make ideas come alive.
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-28 h-28 mx-auto rounded-full object-cover"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
