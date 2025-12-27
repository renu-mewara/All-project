import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();   // ✅ correct hook
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loginloading, setloginloading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    setloginloading(true);

    axios
      .post("http://localhost:5000/api/website/user/login", {
        email: form.email,
        password: form.password,
      })
      .then((result) => {
        if (result.data._status === true) {
          toast.success(result.data._message || "Login successful");
          Cookies.set("user_login", result.data._token); // ✅ save token
          setloginloading(false);

          navigate("/team");   // ✅ Home page open after login
        } else {
          toast.error(result.data._message || "Login failed");
          setloginloading(false);
        }
      })
      .catch((error) => {
        toast.error("Login failed");
        setloginloading(false);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Login to Vedix
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={login} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@vedix.com"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loginloading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loginloading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}
