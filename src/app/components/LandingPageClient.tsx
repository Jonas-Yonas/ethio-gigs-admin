"use client";

import Link from "next/link";
import { FaLightbulb, FaUserFriends, FaRocket } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import ChatbotWidget from "./ChatBot";

export default function LandingPageClient() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-violet-700">EthioGigs</div>
        <div className="flex items-center space-x-4">
          <Link href="/auth/signin">
            <button className="text-violet-700 font-semibold hover:underline">
              Sign In
            </button>
          </Link>
          <Link href="/auth/signup">
            <button className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition">
              Get Started
            </button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center flex-1 px-4 text-center bg-gradient-to-br from-violet-600 to-indigo-600 text-white py-20">
        <h1 className="text-5xl font-bold mb-4">Welcome to EthioGigs</h1>
        <p className="text-lg mb-8">
          Find top talent or freelance opportunities with ease.
        </p>
        <div className="flex space-x-4">
          <Link href="/register?type=freelancer">
            <button className="bg-white text-violet-700 px-6 py-3 rounded-md font-semibold hover:scale-105 transition transform">
              Join as Freelancer
            </button>
          </Link>
          <Link href="/register?type=client">
            <button className="bg-white text-violet-700 px-6 py-3 rounded-md font-semibold hover:scale-105 transition transform">
              Hire Talent
            </button>
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Why Choose EthioGigs?
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: (
                  <FaLightbulb className="h-12 w-12 text-violet-600 mx-auto mb-4" />
                ),
                title: "Innovative Platform",
                description:
                  "Connect with skilled freelancers and clients effortlessly.",
              },
              {
                icon: (
                  <FaUserFriends className="h-12 w-12 text-violet-600 mx-auto mb-4" />
                ),
                title: "Community Focused",
                description:
                  "Built with Ethiopian talent and businesses in mind.",
              },
              {
                icon: (
                  <FaRocket className="h-12 w-12 text-violet-600 mx-auto mb-4" />
                ),
                title: "Fast and Reliable",
                description:
                  "Get your projects done quickly and professionally.",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Gigs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Popular Gigs Right Now
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Website Development",
                desc: "Professional website creation with modern design.",
                price: "$200 - $1000",
              },
              {
                title: "Graphic Design",
                desc: "Logo and branding package for your business.",
                price: "$100 - $500",
              },
              {
                title: "Content Writing",
                desc: "SEO-optimized articles and blog posts.",
                price: "$50 - $300",
              },
            ].map((gig, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transition transform"
              >
                <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
                <p className="text-gray-600 mb-4">{gig.desc}</p>
                <p className="text-violet-600 font-semibold">{gig.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EthioGigs. All rights reserved.
      </footer>

      {/* Global Widgets */}
      <ChatbotWidget />
    </div>
  );
}
