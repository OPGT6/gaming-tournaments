import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { getStripe } from "@/lib/stripe";
import TournamentDetails from "@/components/TournamentDetails";
import RegisterModal from "@/components/RegisterModal";

function TournamentList() {
  const { toast } = useToast();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;
      setTournaments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los torneos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTournamentClick = (tournament) => {
    setSelectedTournament(tournament);
    setShowDetailsModal(true);
  };

  const handleJoinTournament = async (tournament) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setShowRegisterModal(true);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('verified')
      .eq('id', session.user.id)
      .single();

    if (!profile?.verified) {
      toast({
        title: "Cuenta no verificada",
        description: "Por favor, verifica tu cuenta de correo electrónico para participar",
        variant: "destructive"
      });
      return;
    }

    if (tournament.isPaid) {
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        lineItems: [
          {
            price: 'price_1R7R1HEOpvFVADRhf2r2N64E',
            quantity: 1,
          },
        ],
        mode: 'payment',
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      });

      if (error) {
        toast({
          title: "Error en el pago",
          description: error.message,
          variant: "destructive"
        });
      }
    } else {
      // Inscripción gratuita
      try {
        const { error } = await supabase
          .from('registrations')
          .insert([
            {
              user_id: session.user.id,
              tournament_id: tournament.id,
              payment_status: 'completed'
            }
          ]);

        if (error) throw error;

        toast({
          title: "¡Inscripción exitosa!",
          description: `Te has inscrito en ${tournament.name}`
        });

        fetchTournaments(); // Actualizar la lista de torneos
      } catch (error) {
        toast({
          title: "Error en la inscripción",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <>
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Torneos Activos</h2>
        {loading ? (
          <div className="text-center text-gray-400">Cargando torneos...</div>
        ) : (
          <div className="grid gap-6">
            {tournaments.map((tournament, index) => (
              <motion.div
                key={tournament.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-all cursor-pointer"
                onClick={() => handleTournamentClick(tournament)}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{tournament.name}</h3>
                    <p className="text-gray-400 mb-1">Juego: {tournament.game}</p>
                    <p className="text-gray-400 mb-1">Fecha: {new Date(tournament.start_date).toLocaleDateString()}</p>
                    <p className="text-gray-400 mb-1">Premio: {tournament.prize_pool}</p>
                    <p className="text-gray-400">
                      Inscripción: {" "}
                      <span className={tournament.is_paid ? "text-purple-400" : "text-green-400"}>
                        {tournament.registration_fee}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-right mb-4">
                      <p className="text-lg font-semibold">
                        Plazas: {tournament.current_players}/{tournament.max_players}
                      </p>
                      <div className="w-32 h-2 bg-gray-700 rounded-full mt-2">
                        <div 
                          className="h-full bg-purple-600 rounded-full"
                          style={{ 
                            width: `${(tournament.current_players / tournament.max_players) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinTournament(tournament);
                      }}
                      className={`${tournament.is_paid ? 'bg-purple-600 hover:bg-purple-700' : 'bg-green-600 hover:bg-green-700'}`}
                      disabled={tournament.current_players >= tournament.max_players}
                    >
                      {tournament.current_players >= tournament.max_players 
                        ? "Completo" 
                        : "Inscribirse"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {selectedTournament && (
        <TournamentDetails
          tournament={selectedTournament}
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
          onJoin={() => handleJoinTournament(selectedTournament)}
        />
      )}

      <RegisterModal 
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
      />
    </>
  );
}

export default TournamentList;