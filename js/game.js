// js/game.js
import { guardarPartida } from "./storage.js";


console.log("Tres en Raya iniciado...");

const sonidoX = new Audio("../assets/sonido1.mp3");
const sonidoO = new Audio("../assets/sonido2.mp3");
const sonidovictoria = new Audio("../assets/sonido3.mp3");
const sonidoBoton = new Audio("../assets/sonido4.mp3");

const form = document.getElementById("jugadores");
const tablero = document.getElementById("tablero");
const celdas = document.querySelectorAll(".celda");
const turnoTexto = document.getElementById("turno");
const tiempoTexto = document.getElementById("tiempo");
const movimientosTexto = document.getElementById("movimientos");
const btnNuevo = document.getElementById("btn-nuevo");
const btnIniciar = document.getElementById("btn-iniciar");
const btnRevancha = document.getElementById("btn-revancha");

btnIniciar.addEventListener("click", () => {
  sonidoBoton.currentTime = 0; // Reinicia el sonido por si ya estaba sonando
  sonidoBoton.play();
});

btnRevancha.addEventListener("click", () => {
  sonidoBoton.currentTime = 0;
  sonidoBoton.play();
});

btnNuevo.addEventListener("click", () => {
  sonidoBoton.currentTime = 0;
  sonidoBoton.play();
});

let jugador1 = "";
let jugador2 = "";
let turnoActual = "X";
let tableroEstado = Array(9).fill("");
let movimientos = 0;
let tiempoInicio = null;
let intervalo = null;

tablero.style.display = "none";



form.addEventListener("submit", (e) => {
  e.preventDefault();
  jugador1 = document.getElementById("jugador1").value.trim();
  jugador2 = document.getElementById("jugador2").value.trim();
  turnoActual = document.getElementById("empieza").value;

  if (!jugador1 || !jugador2) {
    alert("Por favor, ingresa los nombres de ambos jugadores.");
    return;
  }

  iniciarPartida();
});

function iniciarPartida() {
  form.style.display = "none";
  tablero.style.display = "block";

  tableroEstado = Array(9).fill("");
  movimientos = 0;
  actualizarMovimientos();
  actualizarTurno();
  limpiarCeldas();

  tiempoInicio = new Date();
  if (intervalo) clearInterval(intervalo);
  intervalo = setInterval(actualizarTiempo, 1000);
}

function limpiarCeldas() {
  celdas.forEach((celda) => {
    celda.textContent = "";
    celda.disabled = false;
  });
}

function actualizarTurno() {
  const jugador = turnoActual === "X" ? jugador1 : jugador2;
  turnoTexto.textContent = `Turno: ${jugador} (${turnoActual})`;
}

function actualizarMovimientos() {
  movimientosTexto.textContent = `Movimientos: ${movimientos}`;
}

function actualizarTiempo() {
  const ahora = new Date();
  const diff = Math.floor((ahora - tiempoInicio) / 1000);
  const min = String(Math.floor(diff / 60)).padStart(2, "0");
  const seg = String(diff % 60).padStart(2, "0");
  tiempoTexto.textContent = `Tiempo: ${min}:${seg}`;
}

celdas.forEach((celda, index) => {
  celda.addEventListener("click", () => {
    if (tableroEstado[index] === "") {
      tableroEstado[index] = turnoActual;
      const img = document.createElement("img");
      img.src = turnoActual === "X" ? "../assets/X.png" : "../assets/O.png";
      img.alt = turnoActual;
      img.classList.add("marca");
      celda.appendChild(img);

      celda.disabled = true;
      movimientos++;
      actualizarMovimientos();

        if (turnoActual === "X") {
          sonidoX.play();
        } else {
          sonidoO.play();
        }

      if (verificarGanador()) {
        finalizarPartida(turnoActual);
      } else if (movimientos === 9) {
        finalizarPartida("Empate");
      } else {
        turnoActual = turnoActual === "X" ? "O" : "X";
        actualizarTurno();
      }
    }
  });
});

function verificarGanador() {
  const combinaciones = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return combinaciones.some(([a, b, c]) => {
    return (
      tableroEstado[a] &&
      tableroEstado[a] === tableroEstado[b] &&
      tableroEstado[a] === tableroEstado[c]
    );
  });
}

function finalizarPartida(resultado) {
  clearInterval(intervalo);
  let ganador;
  sonidovictoria.play();

  if (resultado === "Empate") {
    ganador = "Empate";
    alert("¡Empate!");
  } else {
    ganador = resultado === "X" ? jugador1 : jugador2;
    alert(`¡Ganó ${ganador}!`);
  }

  const duracion = tiempoTexto.textContent.replace("Tiempo: ", "");
  const partida = {
    jugador1,
    jugador2,
    ganador,
    duracion,
    movimientos,
    fecha: new Date().toISOString(),
  };

  guardarPartida(partida);
  celdas.forEach((c) => (c.disabled = true));
}

// Botones
btnRevancha.addEventListener("click", () => {
  iniciarPartida();
});

btnNuevo.addEventListener("click", () => {
  clearInterval(intervalo);
  form.style.display = "block";
  tablero.style.display = "none";
  document.getElementById("jugador1").value = "";
  document.getElementById("jugador2").value = "";
  document.getElementById("empieza").value = "X";
});
