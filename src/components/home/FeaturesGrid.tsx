import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Book, GamepadIcon, GraduationCap, Languages } from "lucide-react";
    import { Link } from "react-router-dom";

    const features = [
      {
        title: "Grammar Lessons",
        icon: <GraduationCap className="h-6 w-6" />,
        description: "Master English grammar fundamentals with structured lessons",
        path: "/grammar"
      },
      {
        title: "Language Skills",
        icon: <Languages className="h-6 w-6" />,
        description: "Improve reading, writing, listening and speaking in English",
        path: "/skills"
      },
      {
        title: "Interactive Games",
        icon: <GamepadIcon className="h-6 w-6" />,
        description: "Learn English while having fun with engaging games",
        path: "/games"
      },
      {
        title: "Dictionary & Wordbook",
        icon: <Book className="h-6 w-6" />,
        description: "Build your English vocabulary with personalized word lists",
        path: "/wordbook"
      }
    ];

    export const FeaturesGrid = () => {
      return (
        <section className="py-8 bg-[#F6F6F7]">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Start Your English Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-white border-gray-200">
                  <CardHeader>
                    <div className="mb-2 text-[#8E9196]">{feature.icon}</div>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      );
    };
