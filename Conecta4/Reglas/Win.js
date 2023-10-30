
export {comprobarGanador};
export {Boardwin};
import { ComprobarJugador } from "./EstadoJugador.js";
import {reiniciarTablero} from "./RebootGame.js"
function Boardwin(statecopy){
 let goda
}
function comprobarGanador(statecopy) {
    // Comprobar horizontalmente
    for (let fila = 0; fila < 6; fila++) {
      for (let columna = 0; columna < 4; columna++) {
        if (
          statecopy.tablero[fila][columna]===1 &&
          statecopy.tablero[fila][columna + 1]===1 &&
          statecopy.tablero[fila][columna + 2]===1 &&
          statecopy.tablero[fila][columna + 3]===1
        ) {
            return("Jugador Rojo ha ganado!");
          
        } else if (
          statecopy.tablero[fila][columna]===2 &&
          statecopy.tablero[fila][columna + 1]===2 &&
          statecopy.tablero[fila][columna + 2]===2 &&
          statecopy.tablero[fila][columna + 3]===2
        ) {
            return("Jugador Azul ha ganado!");
          
        }
      }
    }
  
    // Comprobar verticalmente
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 0; columna < 7; columna++) {
        if (
          statecopy.tablero[fila][columna]===1 &&
          statecopy.tablero[fila + 1][columna]===1 &&
          statecopy.tablero[fila + 2][columna]===1 &&
          statecopy.tablero[fila + 3][columna]===1
        ) {
            return("Jugador Rojo ha ganado!");
          
        } else if (
          statecopy.tablero[fila][columna]===2 &&
          statecopy.tablero[fila + 1][columna]===2 &&
          statecopy.tablero[fila + 2][columna]===2 &&
          statecopy.tablero[fila + 3][columna]===2
        ) {
            return("Jugador Azul ha ganado!");
         
        }
      }
    }
  
    // Comprobar diagonalmente (desde la izquierda superior a la derecha inferior)
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 0; columna < 4; columna++) {
        console.log("comprobar ganador"+statecopy.tablero[fila][columna]===1)
        if (
          statecopy.tablero[fila][columna]===1 &&
          statecopy.tablero[fila + 1][columna + 1]===1 &&
          statecopy.tablero[fila + 2][columna + 2]===1 &&
          statecopy.tablero[fila + 3][columna + 3]===1
        ) {
            return("Jugador Rojo ha ganado!");
          
        } else if (
          statecopy.tablero[fila][columna]===2 &&
          statecopy.tablero[fila + 1][columna + 1]===2 &&
          statecopy.tablero[fila + 2][columna + 2]===2 &&
          statecopy.tablero[fila + 3][columna + 3]===2
        ) {
            return("Jugador Azul ha ganado!");
          
        }
      }
    }
  
    // Comprobar diagonalmente (desde la derecha superior a la izquierda inferior)
    for (let fila = 0; fila < 3; fila++) {
      for (let columna = 3; columna < 7; columna++) {
        if (
          statecopy.tablero[fila][columna]===1 &&
          statecopy.tablero[fila + 1][columna - 1]===1 &&
          statecopy.tablero[fila + 2][columna - 2]===1 &&
          statecopy.tablero[fila + 3][columna - 3]===1
        ) {
            return("Jugador Rojo ha ganado!");
          
        } else if (
          statecopy.tablero[fila][columna]===2 &&
          statecopy.tablero[fila + 1][columna - 1]===2 &&
          statecopy.tablero[fila + 2][columna - 2]===2 &&
          statecopy.tablero[fila + 3][columna - 3]===2
        ) {
          return("Jugador Azul ha ganado!");
         
        }
      }
    }
  
    console.log("No hay ganador todavía");
  }
  
