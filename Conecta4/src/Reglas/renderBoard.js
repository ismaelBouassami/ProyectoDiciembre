export { renderBoard ,listenersGame};
import { state } from "../gameViews/conecta4.js";
import { ComprobarJugador } from "./EstadoJugador.js";
import { CrearTablero } from "./CreateBoard.js";
import { mostrarFicha } from "./MostrarFichaATirar.js";
//import { overCasilla } from "../conecta4.js";
import { comprobarGanador } from "./Win.js";
import { reiniciarTablero } from "./RebootGame.js";
import {
  saveGame,
  loadGame,
  getData,
  updateData,
} from "../supabase/GenericSupabase.js";

function listenersGame() {
  const menu = document.getElementById("menuGame");
  const jugarBtn = document.getElementById("jugar");
  const cargarBtn = document.getElementById("cargar");
  const tablero = document.getElementById("Juego");
  menu.style.display = "block";
  tablero.style.display = "none";

  jugarBtn.addEventListener("click", function () {
    menu.style.display = "none";
    tablero.style.display = "block";
    const miboard = CrearTablero(state);
    const overCasilla = mostrarFicha(state);
    renderBoard(state);
  });

  cargarBtn.addEventListener("click", function () {
    alert("cargar");
    menu.style.display = "none";
    tablero.style.display = "block";
  });

  const guardar = document.getElementById("guardar");
  guardar.addEventListener("click", async function () {
    saveGame(state);
  });
  const cargar = document.getElementById("cargar");
  cargar.addEventListener("click", async function () {
    const idUpdate= localStorage.getItem("ID_update");
    let statecopy = await getData(idUpdate);
    console.log("statecopy", statecopy);
    if (statecopy !== null) {
      guardar.style.display="none";
      renderBoard(statecopy);
    }
    console.log("Cargar partida");
  });
}

function renderBoard(statecopy) {
  let boardHtml = document.getElementById("board");
  let primerafila = document.getElementById("ficha_a_tirar");
  let quienJuega = document.getElementById("jugadorColor");
  quienJuega.inert = "";
  primerafila.innerHTML = "";
  boardHtml.innerHTML = ""; // Limpia el tablero antes de renderizar
  ComprobarJugador(statecopy);
  for (let fila = 0; fila < statecopy.tablero.length; fila++) {
    for (let columna = 0; columna < statecopy.tablero[fila].length; columna++) {
      if (fila === 0) {
        let celdaOVer = document.createElement("div");

        celdaOVer.className = "casillaover"; // Puedes agregar estilos CSS para celdas si lo deseas
        // ficha_a_tirar[0][i] = celdaFicha;
        primerafila.append(celdaOVer);
      }
      const celda = document.createElement("div");
      celda.className = "casilla";

      if (statecopy.tablero[fila][columna] === 1) {
        celda.classList.add("casillaRoja");
      } else if (statecopy.tablero[fila][columna] === 2) {
        celda.classList.add("casillaAzul");
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

              updateData(statecopy);

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

      let filaover = document.getElementById("ficha_a_tirar");
      let divSeleccionado = filaover.querySelectorAll(".casillaover")[columna];

      celda.addEventListener("mouseover", function () {
        if (statecopy.juegoEnCurso) {
          //   console.log(
          ///);
          if (statecopy.jugadorRojo) {
            //  console.log("Rojoover");

            statecopy.overCasilla[0][columna] = 1;
            divSeleccionado.classList.remove("casillaover");
            divSeleccionado.classList.add("casillaOverRoja");
            /* console.log("poniendo rojo"); */
          } else {
            //  console.log("Azulover");
            statecopy.overCasilla[0][columna] = 2;
            divSeleccionado.classList.remove("casillaover");
            divSeleccionado.classList.add("casillaOverAzul");
            /* console.log("poniendo azul"); */
          }
        }
      });
      celda.addEventListener("mouseout", function () {
        //console.log("EStas intentando hacer over:" + statecopy.overCasilla[0][columna]);
        if (statecopy.jugadorRojo) {
          statecopy.overCasilla[0][columna] = 0;
          divSeleccionado.classList.remove("casillaOverRoja");
          divSeleccionado.classList.add("casillaover");

          /* console.log("quitando rojo"); */
        } else {
          console.log();
          statecopy.overCasilla[0][columna] = 0;
          divSeleccionado.classList.remove("casillaOverAzul");
          divSeleccionado.classList.add("casillaover");
         /*  console.log("quitando azul"); */
        }
      });
    }
  }
}
