export {reiniciarTablero};
//import { miboard } from "../conecta4.js";
import { renderBoard } from "./renderBoard.js";
function reiniciarTablero(statecopy) {
  // Restablece el estado inicial del tablero, por ejemplo, llenándolo de ceros
  for (let fila = 0; fila < statecopy.tablero.length; fila++) {
      for (let columna = 0; columna < statecopy.tablero[fila].length; columna++) {
          statecopy.tablero[fila][columna] = 0;
      }
  }


  renderBoard(statecopy);
}
