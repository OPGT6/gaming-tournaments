import React from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GamesList from "@/components/GamesList";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Toaster />
      <Navbar />
      <main className="container mx-auto px-4">
        <Hero />
        <GamesList />
      </main>
    </div>
  );
}

export default App;