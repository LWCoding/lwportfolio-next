export default function Navigation() {
  const navItems = [];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Lucas Wang</h1>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="mailto:lswang05@stanford.edu"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              lswang05@stanford.edu
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
