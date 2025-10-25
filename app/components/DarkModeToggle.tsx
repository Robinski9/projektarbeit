"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = saved === "dark" || (!saved && prefersDark);

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    setTimeout(() => {
      setDark(isDark);
      setMounted(true);
      document.body.classList.add("ready");
    }, 0);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    setMoving(true); // start stretching
    setDark(isDark);

    // shorten back after animation
    setTimeout(() => setMoving(false), 200);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      className="relative md:w-13.5 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center md:justify-start md:px-1 cursor-pointer"
    >
      {/* sliding capsule - only visible on medium screens and up */}
      <span
        className={`absolute h-6 rounded-full bg-white dark:bg-black top-1 transition-all duration-200 hidden md:block z-10 ${
          moving ? "w-7" : "w-6"
        }`}
        style={{
          left: dark ? "calc(100% - 0.9rem)" : "0.9rem",
          transform: "translateX(-50%)",
        }}
      />

      {/* Both emojis always visible on medium screens */}
      <span className="hidden md:block absolute left-1 text-sm pointer-events-none z-20">
        🌙
      </span>
      <span className="hidden md:block absolute right-1 text-sm pointer-events-none z-20">
        ☀️
      </span>

      {/* Single emoji for small screens */}
      <span className="md:hidden text-sm pointer-events-none">
        {dark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
