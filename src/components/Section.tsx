import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "secondary";
  container?: boolean;
  separator?: boolean;
}

export default function Section({
  children,
  id,
  className = "",
  background = "default",
  container = true,
  separator = false,
}: SectionProps) {
  const backgroundClasses = {
    default: "",
    secondary: "bg-secondary/30",
  };
  
  const sectionClasses = `py-20 px-4 ${backgroundClasses[background]} ${separator ? 'border-t border-border/50' : ''} ${className}`;
  
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
