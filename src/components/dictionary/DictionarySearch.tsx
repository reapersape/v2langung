import { useState, useRef, useEffect } from "react";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { useToast } from "@/hooks/use-toast";
    import { Search, X } from "lucide-react";

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

    export const DictionarySearch = () => {
      const [word, setWord] = useState("");
      const [definition, setDefinition] = useState<WordDefinition | null>(null);
      const [loading, setLoading] = useState(false);
      const { toast } = useToast();
      const searchButtonRef = useRef<HTMLButtonElement>(null);
      const definitionRef = useRef<HTMLDivElement>(null);

      const searchWord = async () => {
        if (!word.trim()) {
          toast({
            title: "Please enter a word",
            variant: "destructive",
          });
          return;
        }

        setLoading(true);
        try {
          const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
          );
          
          if (!response.ok) {
            throw new Error("Word not found");
          }

          const data = await response.json();
          setDefinition(data[0]);
        } catch (error) {
          toast({
            title: "Word not found",
            description: "Please try another word",
            variant: "destructive",
          });
          setDefinition(null);
        } finally {
          setLoading(false);
        }
      };

      const closeDefinition = () => {
        setDefinition(null);
      };

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            definitionRef.current &&
            !definitionRef.current.contains(event.target as Node) &&
            searchButtonRef.current &&
            !searchButtonRef.current.contains(event.target as Node)
          ) {
            closeDefinition();
          }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

      return (
        <div className="flex-1 max-w-2xl relative">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for a word..."
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchWord()}
              className="text-lg"
            />
            <Button
              onClick={searchWord}
              disabled={loading}
              className="bg-[#8E9196] hover:bg-[#403E43]"
              ref={searchButtonRef}
            >
              <Search className="mr-2" />
              Search
            </Button>
          </div>

          {definition && searchButtonRef.current && (
            <div
              ref={definitionRef}
              className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white p-6 rounded-lg shadow-lg space-y-4 z-10"
              style={{
                top: `${searchButtonRef.current.offsetHeight}px`,
              }}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {definition.word}
                  </h3>
                  {definition.phonetic && (
                    <p className="text-gray-600">{definition.phonetic}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeDefinition}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {definition.meanings.map((meaning, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-[#8E9196]">
                      {meaning.partOfSpeech}
                    </h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {meaning.definitions.map((def, idx) => (
                        <li key={idx} className="text-gray-700">
                          <p>{def.definition}</p>
                          {def.example && (
                            <p className="text-gray-600 italic mt-1">
                              Example: {def.example}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };
