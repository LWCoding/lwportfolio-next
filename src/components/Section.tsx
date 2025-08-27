import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "secondary";
  container?: boolean;
}

export default function Section({
  children,
  id,
  className = "",
  background = "default",
  container = true,
}: SectionProps) {
  const backgroundClasses = {
    default: "",
    secondary: "bg-secondary/30",
  };
  
  const sectionClasses = `py-16 px-4 ${backgroundClasses[background]} ${className}`;
  
  if (container) {
    return (
      <section id={id} className={sectionClasses}>
        <div className="container mx-auto max-w-4xl">
          {children}
        </div>
      </section>
    );
  }
  
  return (
    <section id={id} className={sectionClasses}>
      {children}
    </section>
  );
}
