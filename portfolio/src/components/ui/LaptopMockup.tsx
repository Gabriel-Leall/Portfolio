import { cn } from "@/lib/utils";

interface LaptopMockupProps {
  children: React.ReactNode;
  className?: string;
}

export function LaptopMockup({ children, className }: LaptopMockupProps) {
  return (
    <div className={cn("relative w-full max-w-4xl", className)}>
      {/* Laptop Screen */}
      <div className="relative bg-gray-900 rounded-t-2xl p-3 border-2 border-gray-800 shadow-2xl">
        {/* Webcam indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700" />

        {/* Screen Content */}
        <div className="rounded-lg overflow-hidden bg-white shadow-inner">
          {children}
        </div>
      </div>

      {/* Laptop Base */}
      <div className="relative">
        <div className="bg-linear-to-b from-gray-700 to-gray-800 h-3 rounded-b-2xl shadow-lg" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/3 h-1.5 bg-gray-600 rounded-b-md" />
      </div>

      {/* Stand/Base */}
      <div className="mx-auto w-1/4 h-2 bg-linear-to-b from-gray-700 to-gray-800 rounded-b-xl shadow-md" />
      <div className="mx-auto w-1/3 h-1 bg-gray-600/50 rounded-lg mt-0.5" />
    </div>
  );
}
