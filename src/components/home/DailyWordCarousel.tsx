import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";

interface WordDefinition {
  word: string;
  phonetic?: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}

export const DailyWordCarousel = () => {
  const dailyWords = ["improve", "success", "achieve"];

  const { data: wordDefinitions, isLoading } = useQuery({
    queryKey: ['dailyWords'],
    queryFn: async () => {
      const definitions = await Promise.all(
        dailyWords.map(async (word) => {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          if (!response.ok) throw new Error('Failed to fetch word definition');
          const data = await response.json();
          return data[0] as WordDefinition;
        })
      );
      return definitions;
    }
  });

  return (
    <section className="py-8 bg-[#F1F0FB]">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Word of the Day</h2>
      <Carousel className="max-w-xl mx-auto">
        <CarouselContent>
          {isLoading ? (
            <CarouselItem>
              <Card className="bg-white">
                <CardContent className="text-center py-8 text-gray-600">
                  Loading words...
                </CardContent>
              </Card>
            </CarouselItem>
          ) : (
            wordDefinitions?.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-center text-gray-800">
                      {item.word}
                      {item.phonetic && <span className="block text-sm text-gray-500 mt-1">{item.phonetic}</span>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    {item.meanings.map((meaning, idx) => (
                      <div key={idx} className="text-left mb-2">
                        <p className="text-sm font-semibold text-gray-500">{meaning.partOfSpeech}</p>
                        <p className="text-base text-gray-700">{meaning.definitions[0].definition}</p>
                        {meaning.definitions[0].example && (
                          <p className="text-sm text-gray-500 mt-1">
                            Example: "{meaning.definitions[0].example}"
                          </p>
                        )}
                      </div>
                    )).slice(0, 1)}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
