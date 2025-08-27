import Button from "@/components/Button";
import Navigation from "@/components/Navigation";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-24 pb-16" container={false}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              Lucas Wang
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Game Developer & Computer Science Student
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Game Developer & Computer Science Student. Creating interactive experiences 
              and innovative projects that push the boundaries of game development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button href="#featured-projects" variant="primary">
                View My Projects
              </Button>
              <Button 
                href="https://itch.io/profile/lwcoding"
                variant="outline"
            target="_blank"
            rel="noopener noreferrer"
          >
                Itch.io Profile
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" background="secondary">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              My passion for game development began in middle school with Scratch projects that 
              gained over <span className="font-semibold text-foreground">half a million views</span>. 
              This early success ignited my drive to create increasingly sophisticated interactive experiences.
            </p>
            <p className="text-lg text-muted-foreground">
              As a Computer Science student at Stanford University, I&apos;ve evolved from simple 
              block-based programming to developing complex games in Unity and exploring cutting-edge 
              technologies like VR development and advanced game mechanics.
            </p>
            <p className="text-lg text-muted-foreground">
              My projects span multiple platforms and genres, from indie games on Itch.io to 
              experimental VR experiences. I&apos;m constantly pushing myself to learn new 
              technologies and create innovative gaming experiences.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Stanford University</p>
                  <p className="text-muted-foreground">Junior • Computer Science</p>
                </div>
              </div>
            </div>
            <div className="bg-background p-6 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Unity</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">C#</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">VR/AR</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Mobile Dev</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Networking</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">AI Integration</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Git/GitHub</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Game Design</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured Projects Gallery */}
      <Section id="featured-projects">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 - Unity VR Experience */}
          <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-primary font-semibold">VR Experience</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Immersive VR World</h3>
              <p className="text-muted-foreground mb-4">
                A cutting-edge virtual reality experience showcasing advanced spatial interaction 
                and immersive storytelling techniques.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Unity</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">VR</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">C#</span>
              </div>
              <Button href="https://itch.io/profile/lwcoding" variant="outline" size="sm">
                View Project →
              </Button>
            </div>
          </div>

          {/* Project 2 - 2D Platformer */}
          <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold">2D Platformer</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Pixel Adventure</h3>
              <p className="text-muted-foreground mb-4">
                A polished 2D platformer featuring custom physics, particle effects, and 
                intricate level design with multiple gameplay mechanics.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Unity</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">2D</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Pixel Art</span>
              </div>
              <Button href="https://itch.io/profile/lwcoding" variant="outline" size="sm">
                View Project →
              </Button>
            </div>
          </div>

          {/* Project 3 - Interactive Storytelling */}
          <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <span className="text-primary font-semibold">Interactive Story</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Narrative Experience</h3>
              <p className="text-muted-foreground mb-4">
                An innovative interactive storytelling experience that blends traditional 
                narrative techniques with modern game mechanics.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Narrative</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Interactive</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Branching</span>
              </div>
              <Button href="https://itch.io/profile/lwcoding" variant="outline" size="sm">
                View Project →
              </Button>
            </div>
          </div>

          {/* Project 4 - Multiplayer Game */}
          <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold">Multiplayer</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Cooperative Adventure</h3>
              <p className="text-muted-foreground mb-4">
                A networked multiplayer game featuring real-time cooperation, custom networking 
                solutions, and seamless cross-platform play.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Networking</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Multiplayer</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Unity</span>
              </div>
              <Button href="https://itch.io/profile/lwcoding" variant="outline" size="sm">
                View Project →
              </Button>
            </div>
          </div>

          {/* Project 5 - Mobile Game */}
          <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
              <span className="text-primary font-semibold">Mobile Game</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Touch-Based Puzzle</h3>
              <p className="text-muted-foreground mb-4">
                An innovative mobile puzzle game optimized for touch interfaces with intuitive 
                gesture controls and progressive difficulty.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Mobile</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Touch UI</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Puzzle</span>
              </div>
              <Button href="https://itch.io/profile/lwcoding" variant="outline" size="sm">
                View Project →
              </Button>
            </div>
          </div>

          {/* Project 6 - Experimental Tech */}
          <div className="bg-secondary/30 rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors">
            <div className="aspect-video bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center">
              <span className="text-primary font-semibold">Tech Demo</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">AI-Driven Experience</h3>
              <p className="text-muted-foreground mb-4">
                An experimental project exploring AI integration in games, featuring procedural 
                content generation and adaptive difficulty systems.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">AI</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Procedural</span>
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Experimental</span>
              </div>
              <Button href="https://itch.io/profile/lwcoding" variant="outline" size="sm">
                View Project →
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button href="https://itch.io/profile/lwcoding" variant="primary" target="_blank" rel="noopener noreferrer">
            View All Projects on Itch.io
          </Button>
        </div>
      </Section>

      {/* Programming Timeline */}
      <Section id="timeline" background="secondary">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Programming Journey</h2>
        <div className="max-w-4xl mx-auto">
          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12 md:space-y-4">
              {/* Scratch - Middle School - LEFT SIDE */}
              <div className="relative flex items-center md:mb-0">
                <div className="flex items-center w-full md:w-5/12">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative">
                    <span className="text-primary-foreground font-bold text-sm">S</span>
                  </div>
                  <div className="ml-6">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Middle School</div>
                      <h3 className="text-xl font-semibold mb-2">Scratch</h3>
                      <p className="text-muted-foreground text-sm">
                        First programming language. Created interactive games and animations 
                        that gained <span className="font-semibold text-foreground">500K+ views</span>. 
                        Learned fundamental programming concepts through visual blocks.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Visual Programming</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Game Logic</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* HTML/CSS - RIGHT SIDE */}
              <div className="relative flex items-center md:justify-end md:-mt-8">
                <div className="flex items-center w-full md:w-5/12 md:flex-row-reverse">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative md:ml-6 md:mr-0">
                    <span className="text-primary-foreground font-bold text-sm">W</span>
                  </div>
                  <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Early High School</div>
                      <h3 className="text-xl font-semibold mb-2">HTML & CSS</h3>
                      <p className="text-muted-foreground text-sm">
                        Transitioned to web development to create interactive websites and simple web games. 
                        Learned responsive design and modern CSS techniques.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Web Development</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Responsive Design</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Python - LEFT SIDE */}
              <div className="relative flex items-center md:-mt-8">
                <div className="flex items-center w-full md:w-5/12">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative">
                    <span className="text-primary-foreground font-bold text-sm">Py</span>
                  </div>
                  <div className="ml-6">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">High School</div>
                      <h3 className="text-xl font-semibold mb-2">Python</h3>
                      <p className="text-muted-foreground text-sm">
                        Dove into Python for game development using Pygame. Built text-based adventures, 
                        simple 2D games, and automation scripts. Learned object-oriented programming.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Pygame</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">OOP</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Automation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* C++ - RIGHT SIDE */}
              <div className="relative flex items-center md:justify-end md:-mt-8">
                <div className="flex items-center w-full md:w-5/12 md:flex-row-reverse">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative md:ml-6 md:mr-0">
                    <span className="text-primary-foreground font-bold text-sm">C++</span>
                  </div>
                  <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Late High School</div>
                      <h3 className="text-xl font-semibold mb-2">C++</h3>
                      <p className="text-muted-foreground text-sm">
                        Learned systems programming and performance optimization. Built console games, 
                        data structures, and algorithms. Gained deep understanding of memory management.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Systems Programming</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Performance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* C# - LEFT SIDE */}
              <div className="relative flex items-center md:-mt-8">
                <div className="flex items-center w-full md:w-5/12">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10 relative">
                    <span className="text-primary-foreground font-bold text-sm">C#</span>
                  </div>
                  <div className="ml-6">
                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                      <div className="text-sm text-muted-foreground mb-1">Early Stanford</div>
                      <h3 className="text-xl font-semibold mb-2">C#</h3>
                      <p className="text-muted-foreground text-sm">
                        Transitioned to C# for Unity game development. Created sophisticated 2D and 3D games 
                        with complex mechanics, UI systems, and cross-platform deployment.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">Unity Integration</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Cross-platform</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unity - Current - RIGHT SIDE */}
              <div className="relative flex items-center md:justify-end md:-mt-8">
                <div className="flex items-center w-full md:w-5/12 md:flex-row-reverse">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full border-4 border-background flex items-center justify-center z-10 shadow-lg relative md:ml-6 md:mr-0">
                    <span className="text-primary-foreground font-bold text-sm">U</span>
                  </div>
                  <div className="ml-6 md:ml-0 md:mr-6 md:text-right">
                    <div className="bg-background p-6 rounded-lg border border-primary/50 shadow-lg">
                      <div className="text-sm text-primary mb-1 font-medium">Current Focus</div>
                      <h3 className="text-xl font-semibold mb-2">Unity Engine</h3>
                      <p className="text-muted-foreground text-sm">
                        Primary development environment for creating immersive games. Working with VR/AR, 
                        advanced rendering, networking, and AI integration. Teaching others through Stanford courses.
                      </p>
                      <div className="mt-3">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">VR/AR</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Advanced Rendering</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">Networking</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2">AI Integration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities, collaborations, and connecting 
            with fellow game developers and creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="https://itch.io/profile/lwcoding"
              variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
              View My Games
            </Button>
            <Button 
              href="mailto:contact@example.com"
              variant="outline"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Lucas Wang.
          </p>
        </div>
      </footer>
    </div>
  );
}
