export {CrearTablero};
import {renderBoard} from "./renderBoard.js";

function CrearTablero(statecopy) {
 
  
    // Tamaño del tableroj
    const filas = 6;
    const columnas = 7;
  
    // Inicializa el tablero como un array bidimensional lleno de ceros
    statecopy.tablero = new Array(filas);
  
    for (let i = 0; i < filas; i++) {
      statecopy.tablero[i] = new Array(columnas).fill(0);
    }
  //console.log("Creartablero estado"+statecopy);
  // renderBoard(statecopy);
    return statecopy;
  }