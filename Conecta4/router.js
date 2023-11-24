//import { loginForm } from './src/views/login.js';
import { home } from "./src/views/home.js";
import { gameTemplate } from "./src/gameViews/templates.js";
import { mostrarFicha } from "./src/Reglas/MostrarFichaATirar.js";
import { CrearTablero } from "./src/Reglas/CreateBoard.js";
import { renderBoard } from "./src/Reglas/renderBoard.js";
import { state } from "./src/gameViews/conecta4.js";
export { route };

function route(ruta) {
  console.log({ ruta });
  let params = ruta.split("?")[1];
  params = params
    ? new Map(
        params.split("&").map((param) => {
          const paramArray = param.split("=");
          return [paramArray[0], paramArray[1]];
        })
      )
    : new Map();
  console.log({ params });
  ruta = ruta.split("?")[0];
  const main = document.querySelector("#container");

  switch (ruta) {
    case "#/":
      main.innerHTML = "";
      main.append(home());
      break;
    case "#/login":
      main.innerHTML = "";
      main.append(loginForm());
      break;
    case "#/game":
      main.innerHTML = "";
      main.append(gameTemplate());
    
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

      //   if (params.get('id')) {
      //     generateGame(params.get('id')).then((divs) => main.append(...divs));
      //   } else if (localStorage.getItem('gameId')) {
      //     window.location.hash = `#/game?id=${localStorage.getItem('gameId')}`;
      //  } else {
      //    window.location.hash = '#/';
      // }
      break;
    case "#/allgames":
      main.innerHTML = "";
      main.append(generateGameList());
      break;
    case "#/register":
      main.innerHTML = "";
      main.append(registerForm());
      break;
    case "#/logout":
      logout();
      window.location.hash = "#/";
      break;
    case "#/profile":
      main.innerHTML = "";
      main.append(profileForm());
      break;
    case "":
      window.location.hash = "#/";
      break;
    default:
      window.location.hash = "#/";
  }
}
