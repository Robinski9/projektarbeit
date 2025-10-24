"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false); // track if we are in the browser
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark);

    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    // Only update state after mount to avoid the warning
    setTimeout(() => {
      setDark(isDark);
      setMounted(true); // show body
      document.body.classList.add("ready");
    }, 0);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const isDark = html.classList.contains("dark");
    setDark(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  if (!mounted) return null; // hide toggle until mounted

  return (
    <button
      onClick={toggle}
      className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center px-1 cursor-pointer"
    >
      {/* sliding capsule */}
      <span
        className={`absolute w-6 h-6 bg-white dark:bg-black rounded-full transition-all duration-200 top-1/2 -translate-y-1/2 ${
          dark ? "right-0" : "left-0"
        }`}
      />
      {/* emojis */}
      <span className="absolute left-1 text-sm">🌙</span>
      <span className="absolute right-1 text-sm">☀️</span>
    </button>
  );
}
