export default function Navigation() {
  const navItems = [
    { href: "#featured-projects", label: "Projects" },
    { href: "#timeline", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Lucas Wang</h1>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
