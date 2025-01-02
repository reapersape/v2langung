import { Link } from "react-router-dom";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

    const games = [
      {
        title: "Hangman",
        description: "Guess letters to reveal a hidden word.",
        path: "/games/hangman",
      },
      {
        title: "Sentence Scramble",
        description: "Arrange words to form a correct sentence.",
        path: "/games/sentence-scramble",
      },
    ];

    const Games = () => {
      return (
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Interactive Games</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <Link key={index} to={game.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">{game.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{game.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      );
    };

    export default Games;
