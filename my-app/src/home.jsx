import React from "react";
import "./home.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b0050] via-[#2b0a7f] to-[#0f022d] text-white font-sans">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold tracking-wide">
          SPONZA
        </h1>

        <div className="space-x-6 text-sm opacity-90">
          <a href="#" className="hover:text-purple-300">Home</a>
          <a href="#" className="hover:text-purple-300">Features</a>
          <a href="#" className="hover:text-purple-300">How it Works</a>
          <a href="#" className="hover:text-purple-300">Contact</a>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg">
          Login
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center mt-20 px-6">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Fueling Events.
          <br />
          Empowering Ideas.
        </h2>

        <p className="mt-6 max-w-2xl text-lg opacity-80">
          SPONZA connects colleges with companies to create powerful
          sponsorship opportunities. Discover events, sponsor innovation,
          and grow your brand.
        </p>

        <div className="mt-10 space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-semibold">
            Explore Events
          </button>

          <button className="border border-purple-400 px-8 py-3 rounded-xl hover:bg-purple-700/30">
            Become a Sponsor
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-32 px-10">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose SPONZA
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="For Colleges"
            text="Post events, define sponsorship packages, upload posters, and manage sponsors digitally."
          />

          <FeatureCard
            title="For Sponsors"
            text="Discover college events, promote your brand, and sponsor directly with secure payments."
          />

          <FeatureCard
            title="Secure Platform"
            text="Verified users, transparent payments, analytics, and centralized collaboration."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-32 px-10 text-center">
        <h3 className="text-3xl font-bold mb-12">How It Works</h3>

        <div className="grid md:grid-cols-3 gap-10">
          <Step number="1" text="Colleges publish events and sponsorship needs." />
          <Step number="2" text="Companies browse and choose opportunities." />
          <Step number="3" text="Secure payment and digital promotion." />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 text-center pb-20">
        <h3 className="text-3xl font-bold">
          Start Connecting Today
        </h3>

        <p className="opacity-80 mt-4">
          Join the platform built for modern event sponsorship.
        </p>

        <button className="mt-8 bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-xl text-lg font-semibold">
          Get Started
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:scale-105 transition">
      <h4 className="text-xl font-semibold mb-4">{title}</h4>
      <p className="opacity-80">{text}</p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
      <div className="text-4xl font-bold text-purple-400 mb-4">{number}</div>
      <p className="opacity-80">{text}</p>
    </div>
  );
}
