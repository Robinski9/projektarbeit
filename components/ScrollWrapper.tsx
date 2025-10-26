"use client";

import { useEffect, useState } from "react";

export default function ScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < prevScrollPos;
      const nearTop = currentScrollPos < 10;

      setVisible(isScrollingUp || nearTop);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed top-0 left-0 w-full transition-transform duration-300 z-999 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {children}
    </div>
  );
}

