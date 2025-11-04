import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "secondary";
  container?: boolean;
  separator?: boolean;
  padding?: boolean | string;
}

export default function Section({
  children,
  id,
  className = "",
  background = "default",
  container = true,
  separator = false,
  padding = true,
}: SectionProps) {
  const backgroundClasses = {
    default: "",
    secondary: "bg-secondary/30",
  };
  
  const paddingClass = padding === false 
    ? '' 
    : typeof padding === 'string' 
      ? padding 
      : 'py-20';
  
  const sectionClasses = `${paddingClass} px-4 ${backgroundClasses[background]} ${separator ? 'border-t border-border/50' : ''} ${className}`;
  
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
