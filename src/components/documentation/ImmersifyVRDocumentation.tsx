import Image from 'next/image';

export default function ImmersifyVRDocumentation() {
  return (
    <div className="space-y-12">
      {/* Block of text at the start */}
      <div className="prose prose-lg max-w-none">
        <p className="text-base md:text-lg text-black leading-relaxed">
          ImmersifyVR is a virtual reality exercise application designed to motivate older adults to exercise. 
          This project combines immersive VR technology with evidence-based exercise programs to create engaging 
          workout experiences that help seniors stay active and healthy.
        </p>
      </div>

      {/* Images with tooltip text underneath */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/immersifyvr.png"
              alt="ImmersifyVR feature 1"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-black/70 text-center">
            VR exercise interface
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/immersifyvr.png"
              alt="ImmersifyVR feature 2"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-black/70 text-center">
            User interaction design
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/images/immersifyvr.png"
              alt="ImmersifyVR feature 3"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-black/70 text-center">
            Exercise tracking system
          </p>
        </div>
      </div>

      {/* Video with text to the right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
          <video
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          >
            <source src="/videos/GameShowcase.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-black">
            Immersive Exercise Experience
          </h3>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Watch how ImmersifyVR creates an engaging virtual environment that motivates users 
            to complete their exercise routines. The application uses spatial audio, visual 
            feedback, and gamification elements to make workouts enjoyable and effective.
          </p>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            The VR interface adapts to each user&apos;s fitness level and provides real-time 
            guidance to ensure safe and effective exercise sessions.
          </p>
        </div>
      </div>

      {/* Gallery of images underneath */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="/images/immersifyvr.png"
            alt="ImmersifyVR gallery image 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="/images/immersifyvr.png"
            alt="ImmersifyVR gallery image 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="/images/immersifyvr.png"
            alt="ImmersifyVR gallery image 3"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="/images/immersifyvr.png"
            alt="ImmersifyVR gallery image 4"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="/images/immersifyvr.png"
            alt="ImmersifyVR gallery image 5"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
          <Image
            src="/images/immersifyvr.png"
            alt="ImmersifyVR gallery image 6"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

