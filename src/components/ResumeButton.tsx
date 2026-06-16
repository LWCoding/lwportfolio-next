const RESUME_URL =
  "https://drive.google.com/file/d/1pbLIV1_BPFf6qr7njVC90oN3VfHQzTEB/view?usp=sharing";

export default function ResumeButton({ className }: { className?: string }) {
  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View my Resume"
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer ${className ?? ""}`}
    >
      View my Resume
    </a>
  );
}
