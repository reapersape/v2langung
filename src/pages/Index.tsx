import { HeroSection } from "@/components/home/HeroSection";
import { DailyWordCarousel } from "@/components/home/DailyWordCarousel";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { DictionarySearch } from "@/components/dictionary/DictionarySearch";
import { Logo } from "@/components/common/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F1F1F1]">
      <div className="p-4 flex items-center justify-between bg-white shadow-sm">
        <DictionarySearch />
        <Logo />
      </div>
      <HeroSection />
      <DailyWordCarousel />
      <FeaturesGrid />
    </div>
  );
};

export default Index;
