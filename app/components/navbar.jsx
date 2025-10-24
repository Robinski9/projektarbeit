import React from "react";

export default function Header() {
  return (
    <header className="bg-light dark:bg-dark shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="text-xl font-heading text-brand-500">BioFit</span>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 text-text-light dark:text-text-dark font-sans">
          <a href="#research" className="hover:text-brand-600 transition">
            Research
          </a>
          <a href="#fitness" className="hover:text-brand-600 transition">
            Fitness
          </a>
          <a href="#projects" className="hover:text-brand-600 transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-brand-600 transition">
            Contact
          </a>
        </nav>

        {/* Action Button */}
        <button className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl shadow-md transition font-semibold">
          Join Now
        </button>
      </div>
    </header>
  );
}
