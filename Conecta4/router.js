//import { loginForm } from './src/views/login.js';
import { home } from "./src/views/home.js";
import { gameTemplate } from "./src/gameViews/templates.js";
import { loginForm } from "./src/views/login.js";
import { registerForm } from "./src/views/register.js";
import { logout } from "./src/supabase/users.js";
import { profileForm } from "./src/views/profile.js";
import { renderBoard, listenersGame } from "./src/Reglas/renderBoard.js";
import { state } from "./src/gameViews/conecta4.js";
import {
  mostrarJuegosPorUID,
  mostrarTabla,
} from "./src/gameViews/generateAllgames.js";
import { listGames } from "./src/views/listGames.js";
import { getData } from "./src/supabase/GenericSupabase.js";
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
  let uid = localStorage.getItem("uid");
  console.log("UID del usuario = " + uid);
  const navbar = document.getElementById("navbarDropdown");
  const usuario = localStorage.getItem("nameUser");
  if(usuario!=null||usuario!="")
  navbar.textContent = usuario;
  switch (ruta) {
    case "#/":
      main.innerHTML = "";
      main.append(home());

      const button = document.getElementById("startGame");
      button.addEventListener("click", function () {
        if (uid === "" || uid === null) {
          alert("Debes estar logueado");
          window.location.hash = "#/home";
        } else {
          window.location.hash = "#/allgames";
        }
      });
      break;
    case "#/login":
      main.innerHTML = "";
      main.append(loginForm());
      break;
    case "#/game":
      const idUpdate = localStorage.getItem("ID_update");
      console.log("id update" + idUpdate);
      main.innerHTML = "";
      main.append(gameTemplate());
      if (idUpdate != null || idUpdate > 0) {
        console.log("Entra al if de idupdate /game");
        window.location.hash = `#/game?id=${idUpdate}`;
      }
      listenersGame();

      //   if (params.get('id')) {
      //     generateGame(params.get('id')).then((divs) => main.append(...divs));
      //   } else if (localStorage.getItem('gameId')) {
      //     window.location.hash = `#/game?id=${localStorage.getItem('gameId')}`;
      //  } else {
      //    window.location.hash = '#/';
      // }
      break;
    case "#/allgames":
      if (uid === "" || uid === null) {
        alert("Debes estar logueado");
        window.location.hash = "#/home";
      } else {
        main.innerHTML = "";
        main.append(listGames());
        mostrarJuegosPorUID(uid);
      }
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
      if (uid === "" || uid === null) {
        alert("Debes estar logueado");
        window.location.hash = "#/home";
      } else {
        main.innerHTML = "";
        main.append(profileForm());
      }

      break;
      case "#/refresh":
      window.location.hash = "#/allgames";
      break;
    case "":
      window.location.hash = "#/";
      break;
    default:
      window.location.hash = "#/";
  }
}
