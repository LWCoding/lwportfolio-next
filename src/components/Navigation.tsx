import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
            Lucas Wang
          </Link>
          <div className="flex items-center gap-6">
            <Link 
              href="/projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              Projects
            </Link>
            <div className="hidden md:flex items-center">
              <a 
                href="mailto:lswang05@stanford.edu"
                className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                lswang05@stanford.edu
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
