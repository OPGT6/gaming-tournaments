import React from "react";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Toaster />
      <main className="container mx-auto px-4">
        <h1>Gaming Tournaments</h1>
      </main>
    </div>
  );
}

export default App;