import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  // just layout until layout is merged
  return <div className="bg-zinc-50 h-screen overflow-auto">{children}</div>;
}
