import React from "react";
import { motion } from "framer-motion";

function GamesList() {
  const games = [
    {
      name: "League of Legends",
      description: "Competiciones 5v5 en la Grieta del Invocador",
      image: "lol"
    },
    {
      name: "Rocket League",
      description: "Torneos 3v3 y 2v2",
      image: "rocket-league"
    },
    {
      name: "EAFC 25",
      description: "Ligas y torneos 1v1",
      image: "eafc"
    }
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Juegos Disponibles</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={game.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors"
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <img  
                className="w-full h-full object-cover"
                alt={`${game.name} gameplay`}
                src="https://images.unsplash.com/photo-1698502475216-768a05912f5f" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
            <p className="text-gray-400">{game.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default GamesList;