import Image from 'next/image';

export default function CS42SIDocumentation() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          CS42SI is a course at Stanford focused on Unity and game development. I created the original 
          curriculum, course website, and teaching materials to provide students with hands-on experience 
          building games from concept to completion.
        </p>
      </div>

      {/* Preview Image */}
      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mx-auto">
        <Image
          src="/images/cs42si.png"
          alt="CS42SI website preview"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 900px"
          priority
        />
      </div>

      {/* Mission Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            CS42SI was created to provide Stanford students with a comprehensive, hands-on introduction 
            to Unity and game development. The mission is to take students from zero experience to 
            shipping a complete, playable game by teaching industry-standard tools and practices through 
            project-based learning. The course aims to make game development accessible to beginners 
            while providing the depth and structure needed to build real skills.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            By combining clear learning paths, practical examples, and comprehensive support materials, 
            CS42SI empowers students to overcome the steep learning curve of game development. The course 
            serves as a bridge between interest and expertise, giving students the foundation they 
            need to continue learning independently and pursue game development as a hobby or career.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Process</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-4">
            I designed and developed the CS42SI course through a structured curriculum development process:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black leading-relaxed ml-4">
            <li><strong>Learning Objectives:</strong> Defined clear learning outcomes and skills students should master by course end</li>
            <li><strong>Curriculum Design:</strong> Created project-based modules that build progressively from Unity basics to advanced game systems</li>
            <li><strong>Content Creation:</strong> Developed lecture slides, starter repositories, and step-by-step lab walkthroughs</li>
            <li><strong>Website Development:</strong> Built a course website that serves as a central hub for all materials and resources</li>
            <li><strong>Student Feedback:</strong> Iterated on curriculum based on student feedback and project outcomes</li>
            <li><strong>Showcase Platform:</strong> Created systems to highlight and share student projects with the broader community</li>
          </ul>
        </div>

        {/* Process Image Placeholder */}
        <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mt-6 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
            <p className="text-black/50 text-lg">Curriculum development documentation</p>
          </div>
        </div>
      </div>

      {/* My Work Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">My Work</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-4">
            I created the complete CS42SI course from scratch, developing all curriculum, materials, 
            and infrastructure:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Curriculum Design</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Designed project-based modules covering Unity fundamentals, input systems, physics, 
              UI design, and game polish. Created learning progressions that take students from 
              simple prototypes to complete, playable games.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Course Website</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Built a comprehensive course website using Next.js that hosts all lecture materials, 
              lab walkthroughs, starter repositories, and student project showcases. Designed an 
              intuitive navigation system for easy access to resources.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Teaching Materials</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Created lecture slides, starter code repositories, and detailed lab walkthroughs that 
              guide students through each project. Developed example projects and code samples to 
              illustrate key concepts.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Student Support</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Designed systems for showcasing student work and providing feedback. Created resources 
              that help students troubleshoot common issues and continue learning outside of class time.
            </p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="https://web.stanford.edu/class/cs42si/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span>Visit CS42SI Course Website</span>
        </a>
      </div>
    </div>
  );
}
