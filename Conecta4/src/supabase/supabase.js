import { supabase } from "./GenericSupabase.js";

import * as domino from "../domino.js";
import { getBoardTemplate } from "./templates.js";
import {
  getGame,
  saveGame,
  updateGame,
  getAllGames,
  getAvailableGames,
} from "../services/dominohttp.js";

export { drawPlayers, generateGame, generateGameList };

const generatePlayerDiv = (playerTiles, position) => {
  const tiles = playerTiles
    .map(
      (tile) => `
  <span id="tile-${tile}">${domino.getTile(
        domino.allTiles,
        tile,
        position
      )}</span>
  `
    )
    .join("");
  const div = document.createElement("div");
  div.innerHTML = tiles;
  return div;
};

const generateBoardDiv = (board) => {
  const tiles = board
    .map(
      (
        tile,
        idx
      ) => `<span id="board-${tile.tile}" data-board_index = "${idx}" class="board-tile-${tile.position}"> 
                                            ${tile.tileFigure}</span>`
    )
    .join("");
  const div = document.createElement("div");
  div.innerHTML = tiles;
  return div;
};

const drawPlayers = (state) => {
  const container = document.createElement("div");
  container.append(...getBoardTemplate());
  container
    .querySelector("#player1")
    .append(generatePlayerDiv(state.playersTiles[1], "vertical"));
  container
    .querySelector("#player2")
    .append(
      generatePlayerDiv(
        Array(state.playersTiles[2].length).fill("99"),
        "horizontal"
      )
    );
  container
    .querySelector("#player3")
    .append(
      generatePlayerDiv(
        Array(state.playersTiles[3].length).fill("99"),
        "vertical"
      )
    );
  container
    .querySelector("#player4")
    .append(
      generatePlayerDiv(
        Array(state.playersTiles[4].length).fill("99"),
        "horizontal"
      )
    );
  container.querySelector("#board").append(generateBoardDiv(state.board));
  container.querySelector(`#player${state.turn}`).classList.add("turn");

  container.querySelector(
    "#stats"
  ).innerHTML = `Turn: Player ${state.turn} Winner: ${state.winner} Points: ${state.points}`;

  container.querySelector("#player1").addEventListener("click", (e) => {
    const tileClicked = e.target.id.split("-")[1];
    if (tileClicked && state.turn === 1) {
      if (state.board.length === 0) {
        state = domino.moveToBoard(1, tileClicked, "first", "vertical", state);
        state = domino.changeTurn(state);
      } else {
        state = domino.changeTileChoosen(tileClicked, state);
      }

      drawPlayers(state);
      domino.logPlayers(state);
      domino.logBoard(state);
    }
  });

  container.querySelector("#board").addEventListener("click", async (e) => {
    const tileClicked = e.target.id.split("-")[1];
    const tileIdx = parseInt(e.target.dataset.board_index, 10);

    if (tileClicked) {
      if (state.tileChoosen) {
        const canMove = domino.canFollowBoard(
          state.board,
          state.tileChoosen,
          tileIdx
        );
        if (canMove) {
          const location = tileIdx === 0 ? "before" : "after";
          state = domino.moveToBoard(
            1,
            state.tileChoosen,
            location,
            "vertical",
            state
          );
          state = domino.changeTurn(state);
          state = domino.changeTileChoosen(null, state);
          await updateGame(state, localStorage.getItem("gameId"));
          window.location.hash = `#/game?id=${localStorage.getItem(
            "gameId"
          )}&random=${Math.floor(Math.random() * 1000)}`;
        }
      }
    }
  });

  container
    .querySelector("#machine_step")
    .addEventListener("click", async (e) => {
      state = domino.doMachineStep(state);
      state = domino.changeTurn(state);
      await updateGame(state, localStorage.getItem("gameId"));
      window.location.hash = `#/game?id=${localStorage.getItem(
        "gameId"
      )}&random=${Math.floor(Math.random() * 1000)}`;
    });

  container.querySelector("#new_game").addEventListener("click", async (e) => {
    state = domino.calculateWinner(state);
    state = domino.restartGame(state);
    state = domino.getFirstPlayer(state);
    await updateGame(state, localStorage.getItem("gameId"));
    window.location.hash = `#/game?id=${localStorage.getItem(
      "gameId"
    )}&random=${Math.floor(Math.random() * 1000)}`;
  });

  container.querySelector("#pass").addEventListener("click", async (e) => {
    state = domino.changeTurn(state);
    await updateGame(state, localStorage.getItem("gameId"));
    window.location.hash = `#/game?id=${localStorage.getItem(
      "gameId"
    )}&random=${Math.floor(Math.random() * 1000)}`;
  });

  return container.childNodes.values();
};

const generateGame = async (gameId) => {
  let state;
  state = (await getGame(gameId)).game_state;
  // console.log(state);
  localStorage.setItem("gameId", gameId);
  domino.logBoard(state);
  domino.logPlayers(state);

  return drawPlayers(state);
};

const generateGameList = () => {
  const generateTable = (games) => {
    const gameListTable = document.createElement("table");
    gameListTable.classList.add("table");
    gameListTable.innerHTML = games
      .map(
        (g) => `<tr>
        <td>${g.id}</td>
        <td>${g.player1}</td>
        <td>${g.player2}</td>
        <td>${g.player3}</td>
        <td>${g.player4}</td><td><button class="btn btn-primary" id="play_${g.id}">Play</button></td>
      </tr>`
      )
      .join("");
    gameListTable.addEventListener("click", (event) => {
      const button = event.target;
      if (button.tagName === "BUTTON") {
        const gameId = button.id.split("_")[1];
        window.location.hash = `#/game?id=${gameId}`;
      }
    });
    return gameListTable;
  };

  const userId = localStorage.getItem("uid");

  const gameListDiv = document.createElement("div");
  gameListDiv.classList.add("yourgamesdiv");
  const gameListTable = document.createElement("div");
  gameListTable.innerHTML = "<h2>Your Games</h2>";
  const gameAvailableTable = document.createElement("div");
  gameAvailableTable.innerHTML = "<h2>Available Games</h2>";
  const newGamePlayersInput = document.createElement("input");
  newGamePlayersInput.placeholder = "Players (2-4)";
  const newGameButton = document.createElement("button");
  newGameButton.innerHTML = "New Game";
  newGameButton.addEventListener("click", async () => {
    const nPlayers = newGamePlayersInput.value
      ? parseInt(newGamePlayersInput.value)
      : 4;
    const createdGame = await saveGame(
      { player1: userId },
      domino.getFirstPlayer(domino.startGame(nPlayers, domino.gameState()))
    );
    window.location.hash = `#/game?id=${createdGame[0].id}`;
  });
  gameListDiv.append(
    gameListTable,
    newGamePlayersInput,
    newGameButton,
    gameAvailableTable
  );

  if (userId) {
    getAllGames(userId).then((games) =>
      gameListTable.append(generateTable(games))
    );
    getAvailableGames(userId).then((games) =>
      gameAvailableTable.append(generateTable(games))
    );
  }

  return gameListDiv;
};
