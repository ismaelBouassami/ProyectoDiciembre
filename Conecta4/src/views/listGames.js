export {listGames};


function listGames() {
    const divgames = document.createElement('div');
    divgames.classList.add('gametables');

     divgames.innerHTML = `
     <div class="container mt-5">
     <h1 id="titulo">Tabla de Juegos</h1>
     <br>
     <table class="table">
       <thead>
         <tr>
           <th scope="col">Id_Game</th>
           <th scope="col">Play</th>
           <th scope="col">DELETE</th>
         </tr>
       </thead>
       <tbody id="tablaJuegosBody">
       
       </tbody>
     </table>
   </div>`;

  return divgames;
}