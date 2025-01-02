import { useState, useEffect } from "react";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { useToast } from "@/hooks/use-toast";

    const levels = {
      beginner: [
        { id: "1", sentence: "The cat sat on the mat.", words: ["The", "cat", "sat", "on", "the", "mat."] },
        { id: "2", sentence: "Birds fly in the sky.", words: ["Birds", "fly", "in", "the", "sky."] },
        { id: "3", sentence: "I like to read books.", words: ["I", "like", "to", "read", "books."] },
        { id: "4", sentence: "She is a good student.", words: ["She", "is", "a", "good", "student."] },
      ],
      medium: [
        { id: "5", sentence: "The quick brown fox jumps over the lazy dog.", words: ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."] },
        { id: "6", sentence: "A journey of a thousand miles begins with a single step.", words: ["A", "journey", "of", "a", "thousand", "miles", "begins", "with", "a", "single", "step."] },
        { id: "7", sentence: "To be or not to be that is the question.", words: ["To", "be", "or", "not", "to", "be", "that", "is", "the", "question."] },
        { id: "8", sentence: "The early bird catches the worm.", words: ["The", "early", "bird", "catches", "the", "worm."] },
      ],
      pro: [
        { id: "9", sentence: "The enigmatic symphony of the cosmos resonates with profound mysteries.", words: ["The", "enigmatic", "symphony", "of", "the", "cosmos", "resonates", "with", "profound", "mysteries."] },
        { id: "10", sentence: "Quantum entanglement defies classical intuition by linking particles instantaneously.", words: ["Quantum", "entanglement", "defies", "classical", "intuition", "by", "linking", "particles", "instantaneously."] },
        { id: "11", sentence: "The juxtaposition of ancient ruins and modern skyscrapers creates a captivating paradox.", words: ["The", "juxtaposition", "of", "ancient", "ruins", "and", "modern", "skyscrapers", "creates", "a", "captivating", "paradox."] },
        { id: "12", sentence: "Epistemological inquiries delve into the nature of knowledge and its limitations.", words: ["Epistemological", "inquiries", "delve", "into", "the", "nature", "of", "knowledge", "and", "its", "limitations."] },
      ],
    };

    const SentenceScramble = () => {
      const [selectedLevel, setSelectedLevel] = useState<"beginner" | "medium" | "pro">("beginner");
      const [sentenceData, setSentenceData] = useState<{ id: string; sentence: string; words: string[] } | null>(null);
      const [shuffledWords, setShuffledWords] = useState<string[]>([]);
      const [selectedWords, setSelectedWords] = useState<string[]>([]);
      const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
      const { toast } = useToast();

      useEffect(() => {
        const selectedSentences = levels[selectedLevel];
        const randomSentence = selectedSentences[Math.floor(Math.random() * selectedSentences.length)];
        setSentenceData(randomSentence);
        setShuffledWords([...randomSentence.words].sort(() => Math.random() - 0.5));
        setSelectedWords([]);
        setGameStatus("playing");
      }, [selectedLevel]);

      const handleWordClick = (word: string) => {
        if (gameStatus !== "playing") {
          return;
        }
        setSelectedWords((prev) => [...prev, word]);
        setShuffledWords((prev) => prev.filter((w) => w !== word));
      };

      const handleRemoveWord = (word: string) => {
        if (gameStatus !== "playing") {
          return;
        }
        setSelectedWords((prev) => prev.filter((w) => w !== word));
        setShuffledWords((prev) => [...prev, word]);
      };

      const checkWin = () => {
        if (!sentenceData) return false;
        return selectedWords.join(" ") === sentenceData.sentence;
      };

      const handleCheck = () => {
        if (checkWin()) {
          setGameStatus("won");
          toast({ title: "Congratulations! You unscrambled the sentence!" });
        } else {
          setGameStatus("lost");
          toast({
            title: "Incorrect sentence!",
            description: `Try again.`,
            variant: "destructive",
          });
        }
      };

      const handleLevelChange = (level: "beginner" | "medium" | "pro") => {
        setSelectedLevel(level);
      };

      return (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Sentence Scramble</h1>
          <div className="flex gap-4 mb-4">
            <Button
              variant={selectedLevel === "beginner" ? "destructive" : "default"}
              onClick={() => handleLevelChange("beginner")}
            >
              Beginner
            </Button>
            <Button
              variant={selectedLevel === "medium" ? "destructive" : "default"}
              onClick={() => handleLevelChange("medium")}
            >
              Medium
            </Button>
            <Button
              variant={selectedLevel === "pro" ? "destructive" : "default"}
              onClick={() => handleLevelChange("pro")}
            >
              Pro
            </Button>
          </div>
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-center text-gray-800">
                {gameStatus === "playing" ? "Arrange the words" : gameStatus === "won" ? "You Won!" : "Game Over"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex flex-wrap justify-center gap-2">
                {selectedWords.map((word, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveWord(word)}
                  >
                    {word}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {shuffledWords.map((word, index) => (
                  <Button
                    key={index}
                    variant="default"
                    size="sm"
                    onClick={() => handleWordClick(word)}
                  >
                    {word}
                  </Button>
                ))}
              </div>
              {gameStatus === "playing" && (
                <Button onClick={handleCheck}>Check</Button>
              )}
            </CardContent>
          </Card>
        </div>
      );
    };

    export default SentenceScramble;
