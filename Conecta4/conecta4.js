/*alert("Pulsa en la casilla que quieras jugar");*/
//import { ComprobarJugador } from "./Reglas/EstadoJugador.js";
//import { comprobarGanador } from "./Reglas/Win.js";
//import { reiniciarTablero } from "./Reglas/RebootGame.js";
//import {renderBoard} from "./Reglas/renderBoard.js";
//import { ListenersBoard } from "./Reglas/listenersBoard.js";
import {mostrarFicha} from "./Reglas/MostrarFichaATirar.js"
import { CrearTablero } from "./Reglas/CreateBoard.js";
export { miboard };
export { state };
export {overCasilla};

  let state = {
    jugadorRojo: true,
    juegoEnCurso: true,
    win: "",
    tablero: [],
  };

  const overCasilla = mostrarFicha();
  const miboard = CrearTablero(state);
 
 
 
