import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-[56px]">
      <Navigation />

      {/* main contact section */}
      <main
        className="flex-1 flex flex-col md:flex-row items-stretch"
        style={{ height: "calc(100vh - 56px)" }}
      >
        {/* left side - contact info */}
        <section className="w-full md:w-1/2 flex items-center justify-center bg-gray-200 px-6 md:px-12 py-10">
          <div className="max-w-md w-full space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Let&apos;s Deliberate!
            </h1>
            <p className="text-base md:text-lg text-black/80">
              I love chatting about games, interactive learning, and product design. If you have
              a project, collaboration, or just want to say hi, feel free to reach out.
            </p>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-black/60">
                  Email
                </p>
                <a
                  href="mailto:lswang05@stanford.edu"
                  className="text-base md:text-lg font-semibold text-black underline decoration-2 underline-offset-4 hover:text-black/80 transition-colors cursor-pointer"
                >
                  lswang05@stanford.edu
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold tracking-wide text-black/60 mt-2">
                  Links
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <a
                    href="https://www.linkedin.com/in/lucas-wang-3160b720a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Visit my LinkedIn profile"
                  >
                    <Image
                      src="/images/linkedin.png"
                      alt="linkedin"
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                    />
                  </a>

                  <a
                    href="https://github.com/LWCoding"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Visit my GitHub profile"
                  >
                    <Image
                      src="/images/github.png"
                      alt="github"
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                    />
                  </a>

                  <a
                    href="https://lwcoding.itch.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Visit my itch.io profile"
                  >
                    <Image
                      src="/images/itchio.png"
                      alt="itch.io"
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                    />
                  </a>

                  <a
                    href="https://scratch.mit.edu/users/LWCoding/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Visit my Scratch profile"
                  >
                    <Image
                      src="/images/scratch.svg"
                      alt="scratch"
                      width={32}
                      height={32}
                      className="w-7 h-7 object-contain"
                    />
                  </a>
                </div>
              </div>

              {/* Resume button */}
              <div className="pt-2">
                <a
                  href="https://drive.google.com/file/d/1bhDVCsNctAiE20Tlae4XgHOV9VD2KVeh/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                  aria-label="View my Resume"
                >
                  View my Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* right side - image */}
        <section className="w-full md:w-1/2 relative bg-gray-200 flex-1 md:h-auto">
          <Image
            src="/images/meinkorea.jpg"
            alt="playful illustration representing creative worlds"
            fill
            className="object-cover"
            priority
          />
          {/* subtle overlay for better text contrast on small screens if content overlaps */}
          <div className="absolute inset-0 md:hidden bg-black/10" />
        </section>
      </main>
    </div>
  );
}


