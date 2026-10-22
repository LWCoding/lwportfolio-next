import type { Metadata } from "next";

// Hidden playground: keep it out of search results
export const metadata: Metadata = {
  title: "Playground | Lucas Wang",
  robots: { index: false, follow: false },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
