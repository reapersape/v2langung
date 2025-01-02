import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const { toast } = useToast();
  
  return (
    <section className="text-center space-y-4 py-12 bg-gradient-to-b from-[#FEF7CD] to-[#F2FCE2]">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
        Learn English Online: Interactive Lessons & Games
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Master English effortlessly with our interactive lessons, games, and personalized learning tools.
      </p>
      <Button 
        size="lg" 
        className="bg-[#8E9196] hover:bg-[#403E43] text-white"
        onClick={() => toast({ title: "Coming soon!", description: "This feature is under development." })}
      >
        Start Learning Now <ArrowRight className="ml-2" />
      </Button>
    </section>
  );
};
