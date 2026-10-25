import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import RhythmMuseum from "@/components/playground/rhythm/RhythmMuseum";

export const metadata: Metadata = {
  title: "A Journey Through Rhythm | Lucas Wang",
};

export default function AJourneyThroughRhythmPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white pt-[56px]">
      <Navigation />
      <main className="flex-1">
        <RhythmMuseum />
      </main>
    </div>
  );
}
