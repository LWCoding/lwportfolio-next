import Image from 'next/image';

export default function ImmersifyVRDocumentation() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          ImmersifyVR is a virtual reality exercise application designed to motivate older adults to 
          exercise. The project combines immersive VR technology with evidence-based exercise programs 
          to create engaging workout experiences that help seniors stay active and healthy.
        </p>
      </div>

      {/* Preview Image */}
      <div className="relative w-full max-w-3xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mx-auto">
        <Image
          src="/images/immersifyvr.png"
          alt="ImmersifyVR preview"
          fill
          className="object-cover"
        />
      </div>

      {/* Mission Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Mission</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed">
            ImmersifyVR was created to make exercise engaging, safe, and accessible for older adults 
            through immersive virtual reality technology. The mission is to help seniors maintain their 
            physical health and independence by combining evidence-based exercise programs with the 
            motivational power of immersive experiences. By creating workout routines specifically 
            designed for older adults, the application addresses the unique needs and preferences of 
            seniors that traditional fitness programs often overlook.
          </p>
          <p className="text-base md:text-lg text-black leading-relaxed mt-4">
            The project aims to transform exercise from a chore into an enjoyable activity by leveraging 
            VR's ability to create engaging environments that motivate users to stay active. Through 
            gamification, progress tracking, and adaptive difficulty, ImmersifyVR helps older adults 
            build consistent exercise habits that support long-term health and well-being.
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">Process</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-4">
            I worked with a team to design and develop ImmersifyVR through a user-centered design process:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-black leading-relaxed ml-4">
            <li><strong>User Research:</strong> Conducted interviews and observations with older adults to understand exercise barriers and preferences</li>
            <li><strong>Expert Consultation:</strong> Collaborated with physical therapists and geriatric specialists to ensure exercises were safe and effective</li>
            <li><strong>Prototype Development:</strong> Created VR prototypes to test interaction patterns and exercise mechanics with target users</li>
            <li><strong>Iterative Testing:</strong> Conducted multiple usability sessions with older adults to refine the interface and exercise routines</li>
            <li><strong>Accessibility Design:</strong> Ensured the VR experience accommodated varying levels of mobility and comfort with technology</li>
            <li><strong>Gamification Integration:</strong> Designed reward systems and progress tracking to maintain long-term engagement</li>
          </ul>
        </div>

        {/* Process Image Placeholder */}
        <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 mt-6 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
            <p className="text-black/50 text-lg">User research and testing documentation</p>
          </div>
        </div>
      </div>

      {/* My Work Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-black">My Work</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg text-black leading-relaxed mb-4">
            I contributed to the design and development of ImmersifyVR, focusing on creating an accessible 
            and motivating VR exercise experience:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">VR Interface Design</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Designed intuitive VR interfaces optimized for older adults, with large, clear UI elements 
              and simple interaction patterns. Created spatial audio cues and visual feedback systems 
              to guide users through exercises safely.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Exercise Program Design</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Collaborated with experts to design evidence-based exercise routines adapted for VR. 
              Created progression systems that adapt to individual fitness levels and provide 
              appropriate challenges.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">Gamification Systems</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Developed reward mechanisms and progress tracking to maintain motivation. Designed 
              achievement systems that celebrate milestones and encourage consistent exercise habits.
            </p>
          </div>
          
          <div className="p-5 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-black mb-2">User Testing & Iteration</h3>
            <p className="text-sm text-black/70 leading-relaxed">
              Conducted usability testing sessions with older adults to identify pain points and 
              refine the experience. Iterated on interaction patterns based on user feedback to 
              ensure accessibility and ease of use.
            </p>
          </div>
        </div>
      </div>

      {/* External Links */}
      <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
        <a 
          href="https://www.immersifyvr.org/" 
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
          <span>Visit ImmersifyVR Website</span>
        </a>
        <a 
          href="https://github.com/JLee-003/ImmersifyVR" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
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
          <span>View Source on GitHub</span>
        </a>
      </div>
    </div>
  );
}
