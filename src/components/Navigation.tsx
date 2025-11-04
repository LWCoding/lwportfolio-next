export default function Navigation() {
  return (
    <nav className="w-full bg-gray-800 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">lucas wang.</h1>
          </div>
          <div className="flex items-center gap-8">
            <a 
              href="#featured-projects"
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              projects
            </a>
            <a 
              href="#journey"
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              journey
            </a>
            <a 
              href="#contact"
              className="text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
