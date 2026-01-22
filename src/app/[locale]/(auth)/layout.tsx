import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex justify-between min-h-screen">
      {/* Form Section */}
      <div className="w-full max-w-1.5xl mx-auto px-4 ">
        {children}</div>
    </div>
  );
}
