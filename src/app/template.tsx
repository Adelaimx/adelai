"use client";

import { useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return <div id="template-container" ref={containerRef}>{children}</div>;
}
