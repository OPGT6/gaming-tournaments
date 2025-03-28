import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import RegisterModal from "@/components/RegisterModal";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-purple-400">GamingLeague</h1>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-300 hover:text-white">Inicio</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">Torneos</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">Rankings</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">Contacto</Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowRegisterModal(true)}
            >
              Registrarse
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button variant="ghost" className="text-gray-300 hover:text-white w-full justify-start">
                Inicio
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white w-full justify-start">
                Torneos
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white w-full justify-start">
                Rankings
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white w-full justify-start">
                Contacto
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 w-full"
                onClick={() => {
                  setShowRegisterModal(true);
                  setIsMenuOpen(false);
                }}
              >
                Registrarse
              </Button>
            </div>
          </div>
        )}
      </div>

      <RegisterModal 
        open={showRegisterModal} 
        onOpenChange={setShowRegisterModal}
      />
    </nav>
  );
}

export default Navbar;