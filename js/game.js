// game.js
import { guardarPartida, obtenerUltimaPartida } from "./storage.js";

console.log("Tres en Raya iniciado ✅");

const ultima = obtenerUltimaPartida();
if (ultima) {
  console.log("Última partida:", ultima);
}

// Simulación de una partida
const partida = {
  jugador1: "Angy",
  jugador2: "Alex",
  ganador: "Empate",
  duracion: "02:13",
  movimientos: 9,
  fecha: new Date().toISOString()
};

guardarPartida(partida);
