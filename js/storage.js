// storage.js
export function guardarPartida(data) {
  console.log("Guardando partida:", data);
  localStorage.setItem("ppw-tresenraya:lastGame", JSON.stringify(data));
}

export function obtenerUltimaPartida() {
  return JSON.parse(localStorage.getItem("ppw-tresenraya:lastGame"));
}
