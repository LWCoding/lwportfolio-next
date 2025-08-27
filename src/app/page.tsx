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
              Game Developer & Instructor at Stanford University
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Founder of Stanford Video Game Development Club. Creating interactive experiences 
              that inspire the next generation of game creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button href="#projects" variant="primary">
                View My Work
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
              My journey in game development began in middle school, where my Scratch projects 
              gained over <span className="font-semibold text-foreground">half a million views</span>, 
              sparking a lifelong passion for creating interactive experiences.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, I'm a Junior at Stanford University and the founder of the 
              <span className="font-semibold text-foreground"> Stanford Video Game Development Club</span>. 
              I develop games in Unity and share my expertise as an instructor for Stanford's 
              official student-initiated courses.
            </p>
            <p className="text-lg text-muted-foreground">
              Dedicated to both learning and teaching, I'm excited to inspire the next 
              generation of game creators through education and hands-on development.
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
              <h3 className="text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Unity</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">C#</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">VR Development</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">2D Game Dev</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Scratch</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">Teaching</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Experience</h2>
        <div className="space-y-8">
          <div className="bg-secondary/30 p-8 rounded-lg border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold">Course Instructor</h3>
              <span className="text-muted-foreground">Stanford University</span>
            </div>
            <p className="text-muted-foreground mb-4">Teaching official student-initiated courses:</p>
            <div className="space-y-3">
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-medium">CS11SI - VR Development</h4>
                <p className="text-sm text-muted-foreground">Instructor for Virtual Reality Development course</p>
              </div>
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-medium">CS42SI - 2D Game Development</h4>
                <p className="text-sm text-muted-foreground">Instructor for 2D Game Development course</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 p-8 rounded-lg border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold">Founder & President</h3>
              <span className="text-muted-foreground">Stanford Video Game Development Club</span>
            </div>
            <p className="text-muted-foreground">
              Founded and lead the Stanford Video Game Development Club, fostering a community 
              of game developers and creators on campus. Organizing workshops, game jams, and 
              networking events for students interested in game development.
            </p>
          </div>

          <div className="bg-secondary/30 p-8 rounded-lg border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h3 className="text-xl font-semibold">Game Developer</h3>
              <span className="text-muted-foreground">LWCoding (Itch.io)</span>
            </div>
            <p className="text-muted-foreground">
              Independent game developer with a portfolio of games available on Itch.io. 
              Creating engaging interactive experiences using Unity and other game development tools.
            </p>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" background="secondary">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3">Itch.io Portfolio</h3>
            <p className="text-muted-foreground mb-4">
              A collection of games developed under the LWCoding alias, showcasing various 
              game development skills and creative projects.
            </p>
            <Button 
              href="https://itch.io/profile/lwcoding"
              variant="outline"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Portfolio →
            </Button>
          </div>
          
          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3">Scratch Projects</h3>
            <p className="text-muted-foreground mb-4">
              Early game development projects that gained over half a million views, 
              demonstrating the foundation of my passion for interactive experiences.
            </p>
            <span className="text-sm text-muted-foreground">500K+ views achieved</span>
          </div>

          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3">Unity Games</h3>
            <p className="text-muted-foreground mb-4">
              Professional game development projects created with Unity, featuring 
              both 2D and 3D experiences with modern game development practices.
            </p>
            <span className="text-sm text-muted-foreground">C# • Unity Engine</span>
          </div>

          <div className="bg-background p-6 rounded-lg border border-border">
            <h3 className="text-xl font-semibold mb-3">VR Development</h3>
            <p className="text-muted-foreground mb-4">
              Virtual reality projects and experiences, teaching others the fundamentals 
              of VR development through Stanford's CS11SI course.
            </p>
            <span className="text-sm text-muted-foreground">VR • Immersive Experiences</span>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities, collaborations, and connecting 
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
            © 2024 Lucas Wang. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
