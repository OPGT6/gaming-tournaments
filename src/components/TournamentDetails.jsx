import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function TournamentDetails({ tournament, open, onOpenChange, onJoin }) {
  const { toast } = useToast();
  const discordInviteLink = "https://discord.gg/yjcQSPt5";

  const handleDiscordClick = () => {
    window.open(discordInviteLink, '_blank');
  };

  if (!tournament) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {tournament.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {tournament.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Información General</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-400">Juego:</span> {tournament.game}</li>
                <li><span className="text-gray-400">Fecha:</span> {new Date(tournament.start_date).toLocaleDateString()}</li>
                <li><span className="text-gray-400">Premio:</span> {tournament.prize_pool}</li>
                <li><span className="text-gray-400">Inscripción:</span> {tournament.registration_fee}</li>
                <li><span className="text-gray-400">Plazas:</span> {tournament.current_players}/{tournament.max_players}</li>
              </ul>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Requisitos</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {tournament.requirements?.map((req, index) => (
                  <li key={index} className="text-gray-300">{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={onJoin}
                className={`flex-1 ${tournament.is_paid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'}`}
                disabled={tournament.current_players >= tournament.max_players}
              >
                {tournament.current_players >= tournament.max_players 
                  ? "Completo" 
                  : `Inscribirse ${tournament.is_paid ? `- ${tournament.registration_fee}` : '(Gratis)'}`}
              </Button>
              <Button
                onClick={handleDiscordClick}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Discord
              </Button>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Participantes</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400 pb-2 border-b border-gray-600">
                <span>Jugador</span>
                <span>Plataforma</span>
                <span>Estado</span>
              </div>
              {tournament.participants?.map((participant, index) => (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center text-sm py-2 border-b border-gray-600/50"
                >
                  <span>{participant.username}</span>
                  <span className="text-gray-400">{participant.platform}</span>
                  <span className={`text-${participant.verified ? 'green' : 'yellow'}-400`}>
                    {participant.verified ? 'Verificado' : 'Pendiente'}
                  </span>
                </motion.div>
              ))}
              {(!tournament.participants || tournament.participants.length === 0) && (
                <p className="text-center text-gray-400 py-4">
                  No hay participantes inscritos todavía
                </p>
              )}
            </div>
            <div className="mt-4">
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(tournament.current_players / tournament.max_players) * 100}%`
                  }}
                />
              </div>
              <p className="text-center text-sm text-gray-400 mt-2">
                {tournament.current_players} de {tournament.max_players} plazas ocupadas
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TournamentDetails;