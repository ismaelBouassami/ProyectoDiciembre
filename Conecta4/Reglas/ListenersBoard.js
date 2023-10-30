export { MostrarEstadoFuncional };

import { renderBoard } from "./renderBoard.js";
import { ComprobarJugador } from "./EstadoJugador.js";
//Estos listeners se llamaran en renderBoard para que se ejecuten cada vez que cambiemos algo
function ListenersBoard(statecopy) {
  const celdas = document.querySelectorAll(".casilla");
  celdas.forEach((celda, columna) => {
  // Configura el listener de clic en las celdas del tablero
 
});
}


function MostrarEstadoFuncional(statecopy) {
  console.log("MostrarEstado"+statecopy);
}