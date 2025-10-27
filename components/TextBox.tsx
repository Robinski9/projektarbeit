"use client";

import React, { ReactNode } from "react";

interface TextBoxProps {
  children: ReactNode;
  className?: string; // optional extra Tailwind classes
}

const TextBox: React.FC<TextBoxProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        w-full
        max-w-full
        border-2
        rounded-lg
        shadow-default
        p-4
        text-fluid
        bg-textbox-light/70
        border-textboxborder-light
        text-text-light
        dark:bg-textbox-dark/70
        dark:border-textboxborder-dark
        dark:text-text-dark
        backdrop-blur-md
        wrap-break-word
        whitespace-normal
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default TextBox;
