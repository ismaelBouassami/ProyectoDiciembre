export {gameTemplate}

function gameTemplate  () {
const template= `<h1 id="titulo">Conecta <span style="color: #e74c3c;">4</span></h1>
<div id="menuGame"> 
    <button id="jugar">New_Game</button>
    <button id="cargar">Load_Game</button>
</div>
<div id="Juego">
<div id="Estado_Jugador">
    <p><b>Turno:</b> <span style="font-weight: bold;" id="jugadorColor" class="JugadorRojo">JugadorRojo</span></p>
   
</div>
<div id="mensaje-ganador" class="mensaje-ganador">
    <p id="mensaje-texto"></p>
    <button id="cerrar-mensaje">Close</button>
    <button id="reiniciar">Reboot</button>
  </div>
  
<div id="ficha_a_tirar"></div>
<div id="board">

</div>
<div id="botonGuardar">
<button id="guardar">Save</button>
</div>
</div>`;

const wrapper = document.createElement("div")
wrapper.innerHTML = template;
return wrapper;
};

