/*alert("Pulsa en la casilla que quieras jugar");*/
//import { ComprobarJugador } from "./Reglas/EstadoJugador.js";
//import { comprobarGanador } from "./Reglas/Win.js";
//import { reiniciarTablero } from "./Reglas/RebootGame.js";
//import {renderBoard} from "./Reglas/renderBoard.js";
//import { ListenersBoard } from "./Reglas/listenersBoard.js";
import {mostrarFicha} from "./Reglas/MostrarFichaATirar.js"
import { CrearTablero } from "./Reglas/CreateBoard.js";
import { renderBoard } from "./Reglas/renderBoard.js";
export { state };




  let state = {
    jugadorRojo: true,
    juegoEnCurso: true,
    win: "",
    tablero: [],
    overCasilla:[],
  };
  
document.addEventListener("DOMContentLoaded",function () {
  const miboard = CrearTablero(state);
  console.log(state);
  const overCasilla = mostrarFicha(state);
  console.log(state);
  renderBoard(state);
  console.log(miboard);
})

  

 
