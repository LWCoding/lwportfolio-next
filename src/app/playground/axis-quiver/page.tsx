import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AxisQuiver from "@/components/playground/AxisQuiver";

export const metadata: Metadata = {
  title: "Axis Quiver | Lucas Wang",
};

export default function AxisQuiverPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white pt-[56px]">
      <Navigation />
      <main className="flex-1">
        <AxisQuiver />
      </main>
    </div>
  );
}
