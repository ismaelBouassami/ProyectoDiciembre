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
  
  const menu = document.getElementById("menu");
  const jugarBtn = document.getElementById("jugar");
  const cargarBtn = document.getElementById("cargar");
  const tablero= document.getElementById("Juego");
  menu.style.display= "block";
  tablero.style.display= "none";
  jugarBtn.addEventListener("click", function () {
    menu.style.display= "none";
    tablero.style.display= "block";
      const miboard = CrearTablero(state);
      const overCasilla = mostrarFicha(state);
      renderBoard(state);
    
   
  });

  cargarBtn.addEventListener("click", function () {
     alert("cargar")
     menu.style.display= "none";
    tablero.style.display= "block";
  });


  

 
