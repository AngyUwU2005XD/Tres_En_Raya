export function guardarPartida(data) {
  const clave = "ppw-tresenraya:partidas";
  const partidas = JSON.parse(localStorage.getItem(clave)) || [];
  partidas.push(data);
  localStorage.setItem(clave, JSON.stringify(partidas));
  console.log("Guardando partida:", data);
}
