export { renderBoard };
import { ComprobarJugador } from "./EstadoJugador.js";
import { overCasilla } from "../conecta4.js";
import { comprobarGanador } from "./Win.js";
import { reiniciarTablero } from "./RebootGame.js";

function renderBoard(statecopy) {
  let boardHtml = document.getElementById("board");
  boardHtml.innerHTML = ""; // Limpia el tablero antes de renderizar
  for (let fila = 0; fila < statecopy.tablero.length; fila++) {
    for (let columna = 0; columna < statecopy.tablero[fila].length; columna++) {
      const celda = document.createElement("div");
      celda.className = "casilla";

      if (statecopy.tablero[fila][columna] === 1) {
        celda.classList.add("casillaRoja");

        //quitar la ficha superior
        overCasilla[0][columna].classList.remove("casillaOverRoja");
        overCasilla[0][columna].classList.add("casillaOver");
      } else if (statecopy.tablero[fila][columna] === 2) {
        celda.classList.add("casillaAzul");
        overCasilla[0][columna].classList.remove("casillaOverAzul");
        overCasilla[0][columna].classList.add("casillaOver");
      }

      boardHtml.appendChild(celda);

      celda.addEventListener("click", function () {
        if (statecopy.juegoEnCurso) {
          // Encuentra la fila adecuada para colocar la ficha en la columna
          for (let fila = 5; fila >= 0; fila--) {
            if (statecopy.tablero[fila][columna] === 0) {
              if (statecopy.jugadorRojo) {
                statecopy.tablero[fila][columna] = 1;
              } else {
                statecopy.tablero[fila][columna] = 2;
              }

           /*   console.log(
                "Ha tirado ficha en " +
                  fila +
                  " " +
                  columna +
                  " =" +
                  statecopy.tablero[fila][columna]
              );*/

              renderBoard(statecopy); // Actualiza la representación del tablero
              statecopy.jugadorRojo = !statecopy.jugadorRojo; // Alternar el jugador

              ComprobarJugador(statecopy);
              break;
            }
          }
        }
        statecopy.win = comprobarGanador(statecopy);

        const mensajeGanador = document.getElementById("mensaje-ganador");
        const mensajeTexto = document.getElementById("mensaje-texto");
        const cerrarMensaje = document.getElementById("cerrar-mensaje");
        const reiniciarJuego = document.getElementById("reiniciar");
        reiniciarJuego.addEventListener("click", function () {
         
          statecopy.jugadorRojo = true;
          statecopy.juegoEnCurso = true;
          reiniciarTablero(statecopy);
          mensajeGanador.style.display = "none";
        });
        cerrarMensaje.addEventListener("click", function () {
          mensajeGanador.style.display = "none";
        });

        if (statecopy.win === "Jugador Rojo ha ganado!") {
          //  alert("Rojo statecopy.win");
          mensajeTexto.textContent = "Jugador Rojo ha ganado!";
          mensajeGanador.style.display = "block";
          statecopy.jugadorRojo = true;
          statecopy.juegoEnCurso = false;
          ComprobarJugador(statecopy);
        } else if (statecopy.win == "") {
          //no ha ganado alguien aun
        } else if (statecopy.win === "Jugador Azul ha ganado!") {
          //   alert("Azul statecopy.win");
          mensajeTexto.textContent = "Jugador Azul ha ganado!";
          mensajeGanador.style.display = "block";
          statecopy.jugadorRojo = false;
          statecopy.juegoEnCurso = false;
          ComprobarJugador(statecopy);
        }
      });
      celda.addEventListener("mouseover", function () {
        if (statecopy.juegoEnCurso) {
          for (let fila = 5; fila >= 0; fila--) {
         //   console.log(
              ///);
            if (statecopy.jugadorRojo) {
            //  console.log("Rojoover");
              overCasilla[0][columna].classList.remove("casillaOver");
              overCasilla[0][columna].classList.add("casillaOverRoja");
            } else {
            //  console.log("Azulover");
              overCasilla[0][columna].classList.remove("casillaOver");
              overCasilla[0][columna].classList.add("casillaOverAzul");
            }

            break;
          }
        }
      });
      celda.addEventListener("mouseout", function () {
        for (let fila = 5; fila >= 0; fila--) {
          //console.log("EStas intentando hacer over:" + overCasilla[0][columna]);
          if (statecopy.jugadorRojo) {
            overCasilla[0][columna].classList.remove("casillaOverRoja");
            overCasilla[0][columna].classList.add("casillaOver");
          } else {
            overCasilla[0][columna].classList.remove("casillaOverAzul");
            overCasilla[0][columna].classList.add("casillaOver");
          }

          break;
        }
      });
    }
  }
}
