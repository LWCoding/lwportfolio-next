export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Lucas Wang</h1>
          <div className="hidden md:flex items-center">
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
