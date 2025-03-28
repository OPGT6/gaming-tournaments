import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function RegisterModal({ open, onOpenChange }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    platforms: [{ name: "", username: "" }]
  });

  const handleAddPlatform = () => {
    setFormData({
      ...formData,
      platforms: [...formData.platforms, { name: "", username: "" }]
    });
  };

  const handlePlatformChange = (index, field, value) => {
    const newPlatforms = [...formData.platforms];
    newPlatforms[index][field] = value;
    setFormData({
      ...formData,
      platforms: newPlatforms
    });
  };

  const handleRemovePlatform = (index) => {
    const newPlatforms = formData.platforms.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      platforms: newPlatforms
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });

      if (authError) throw authError;

      // Create profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            username: formData.username,
            email: formData.email,
            platforms: formData.platforms,
            verified: false
          }
        ]);

      if (profileError) throw profileError;

      toast({
        title: "¡Registro iniciado!",
        description: "Por favor, verifica tu correo electrónico para activar tu cuenta"
      });

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        platforms: [{ name: "", username: "" }]
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error en el registro",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Registro de Jugador
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre de usuario en la web</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Plataformas de juego</label>
              <Button
                type="button"
                onClick={handleAddPlatform}
                variant="outline"
                className="text-sm border-purple-500 text-purple-400 hover:bg-purple-500/10"
              >
                Añadir plataforma
              </Button>
            </div>
            <AnimatePresence>
              {formData.platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex gap-2"
                >
                  <div className="flex-1">
                    <select
                      value={platform.name}
                      onChange={(e) => handlePlatformChange(index, "name", e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    >
                      <option value="">Selecciona plataforma</option>
                      <option value="steam">Steam</option>
                      <option value="epic">Epic Games</option>
                      <option value="origin">Origin</option>
                      <option value="psn">PlayStation Network</option>
                      <option value="xbox">Xbox Live</option>
                      <option value="nintendo">Nintendo Switch</option>
                      <option value="riot">Riot Games</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Nombre en la plataforma"
                      value={platform.username}
                      onChange={(e) => handlePlatformChange(index, "username", e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => handleRemovePlatform(index)}
                      variant="destructive"
                      className="px-2"
                    >
                      ×
                    </Button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </Button>

          <p className="text-sm text-gray-400 text-center mt-4">
            Recibirás un email de confirmación para activar tu cuenta
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterModal;