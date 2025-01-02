import { BookOpen } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <BookOpen className="h-6 w-6 text-[#8E9196]" />
      <span className="font-bold text-xl text-[#403E43]">Langung</span>
    </div>
  );
};
