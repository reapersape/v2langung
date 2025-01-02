import { useState, useEffect, useRef } from "react";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { useToast } from "@/hooks/use-toast";

    const levels = {
      beginner: ["apple", "banana", "cherry", "date", "elder"],
      medium: ["elephant", "giraffe", "hippopotamus", "kangaroo", "octopus"],
      pro: ["ambiguous", "ubiquitous", "quixotic", "mellifluous", "ephemeral"],
    };

    const Hangman = () => {
      const [selectedLevel, setSelectedLevel] = useState<"beginner" | "medium" | "pro">("beginner");
      const [word, setWord] = useState("");
      const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
      const [incorrectGuesses, setIncorrectGuesses] = useState(0);
      const [correctGuesses, setCorrectGuesses] = useState(0);
      const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
      const [wordIndex, setWordIndex] = useState(0);
      const [score, setScore] = useState(0);
      const [time, setTime] = useState(0);
      const [timerActive, setTimerActive] = useState(false);
      const timerRef = useRef<number | null>(null);
      const { toast } = useToast();
      const timeLimit = 20;
      const maxIncorrectGuesses = 7;

      useEffect(() => {
        setWord(levels[selectedLevel][wordIndex]);
        setGuessedLetters([]);
        setIncorrectGuesses(0);
        setCorrectGuesses(0);
        setGameStatus("playing");
        setTime(0);
        setTimerActive(true);
      }, [selectedLevel, wordIndex]);

      useEffect(() => {
        if (timerActive) {
          timerRef.current = setInterval(() => {
            setTime((prev) => {
              if (prev >= timeLimit) {
                setGameStatus("lost");
                toast({
                  title: "Time's up!",
                  description: `The word was: ${word}`,
                  variant: "destructive",
                });
                setTimerActive(false);
                return timeLimit;
              }
              return prev + 1;
            });
          }, 1000);
        } else {
          clearInterval(timerRef.current as number);
        }
        return () => clearInterval(timerRef.current as number);
      }, [timerActive, word]);

      const handleGuess = (letter: string) => {
        if (gameStatus !== "playing" || guessedLetters.includes(letter)) {
          return;
        }

        setGuessedLetters((prev) => [...prev, letter]);

        if (!word.includes(letter)) {
          setIncorrectGuesses((prev) => prev + 1);
        }
      };

      const checkWin = () => {
        return word.split("").every((letter) => guessedLetters.includes(letter));
      };

      const handleCheck = () => {
        if (checkWin()) {
          setGameStatus("won");
          setScore((prev) => prev + 10);
          setCorrectGuesses((prev) => prev + 1);
          toast({ title: "Correct! Moving to the next word." });
          setTimerActive(false);
          setTimeout(() => {
            setWordIndex((prev) => (prev + 1) % levels[selectedLevel].length);
          }, 1000);
        } else if (incorrectGuesses >= maxIncorrectGuesses) {
          setGameStatus("lost");
          toast({
            title: "Game Over!",
            description: `The word was: ${word}`,
            variant: "destructive",
          });
          setTimerActive(false);
        } else {
          toast({
            title: "Incorrect!",
            description: `Try again.`,
            variant: "destructive",
          });
        }
      };

      const handleLevelChange = (level: "beginner" | "medium" | "pro") => {
        setSelectedLevel(level);
        setWordIndex(0);
        setScore(0);
      };

      const handleNextWord = () => {
        setWordIndex((prev) => (prev + 1) % levels[selectedLevel].length);
        setGuessedLetters([]);
        setIncorrectGuesses(0);
        setGameStatus("playing");
        setTimerActive(true);
        setTime(0);
      };

      const handleTryAgain = () => {
        setGuessedLetters([]);
        setIncorrectGuesses(0);
        setGameStatus("playing");
        setTimerActive(true);
        setTime(0);
      };

      const renderWord = () => {
        return word
          .split("")
          .map((letter, index) => (
            <span key={index} className="text-2xl font-mono mx-1">
              {guessedLetters.includes(letter) ? letter : "_"}
            </span>
          ));
      };

      const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

      return (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Hangman</h1>
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
                {gameStatus === "playing" ? "Guess the word" : gameStatus === "won" ? "You Won!" : "Game Over"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-gray-700">
                {gameStatus !== "playing" && <span className="text-gray-500">The word was: {word}</span>}
                {gameStatus === "playing" ? renderWord() : null}
              </div>
              {gameStatus === "playing" && (
                <div className="flex flex-wrap justify-center gap-2">
                  {alphabet.map((letter) => (
                    <Button
                      key={letter}
                      variant="outline"
                      size="sm"
                      onClick={() => handleGuess(letter)}
                      disabled={guessedLetters.includes(letter)}
                    >
                      {letter}
                    </Button>
                  ))}
                </div>
              )}
              <p className="text-gray-500">Incorrect Guesses: {incorrectGuesses} / {maxIncorrectGuesses}</p>
              <p className="text-gray-500">Correct Guesses: {correctGuesses}</p>
              <p className="text-gray-500">Time: {formatTime(time)}</p>
              <p className="text-gray-500">Score: {score}</p>
              {gameStatus === "playing" && (
                <div className="flex justify-center gap-2">
                  <Button onClick={handleCheck}>Check</Button>
                  <Button onClick={handleNextWord}>Next Word</Button>
                </div>
              )}
              {gameStatus !== "playing" && (
                <Button onClick={handleTryAgain}>Try Again</Button>
              )}
            </CardContent>
          </Card>
        </div>
      );
    };

    export default Hangman;
