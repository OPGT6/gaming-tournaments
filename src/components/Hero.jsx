import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20 text-center"
    >
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        Competiciones Gaming Online
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Participa en torneos de tus juegos favoritos y compite contra los mejores jugadores
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
          Ver Torneos
        </Button>
        <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/10">
          Cómo Participar
        </Button>
      </div>
    </motion.section>
  );
}

export default Hero;