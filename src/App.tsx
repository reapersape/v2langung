import { Toaster } from "@/components/ui/toaster";
    import { Toaster as Sonner } from "@/components/ui/sonner";
    import { TooltipProvider } from "@/components/ui/tooltip";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { BrowserRouter, Routes, Route } from "react-router-dom";
    import Index from "./pages/Index";
    import Wordbook from "./pages/Wordbook";
    import Games from "./pages/Games";
    import Hangman from "./pages/games/Hangman";
    import SentenceScramble from "./pages/games/SentenceScramble";

    const queryClient = new QueryClient();

    const App = () => (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/wordbook" element={<Wordbook />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games/hangman" element={<Hangman />} />
              <Route path="/games/sentence-scramble" element={<SentenceScramble />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );

    export default App;
