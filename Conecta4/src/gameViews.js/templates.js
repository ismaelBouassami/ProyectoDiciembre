export {gameTemplate}

const gameTemplate = ()=> {
const template= `<h1 id="titulo">Conecta <span style="color: #e74c3c;">4</span></h1>
<div id="menu"> 
    <button id="jugar">Jugar</button>
    <button id="cargar">Cargar Partida</button>
</div>
<div id="Juego">
<div id="Estado_Jugador">
    <p><b>Turno:</b> <span style="font-weight: bold;" id="jugadorColor" class="JugadorRojo">JugadorRojo</span></p>
   
</div>
<div id="mensaje-ganador" class="mensaje-ganador">
    <p id="mensaje-texto"></p>
    <button id="cerrar-mensaje">Cerrar</button>
    <button id="reiniciar">Jugar de Nuevo</button>
  </div>
  
<div id="ficha_a_tirar"></div>
<div id="board">

</div>
<button id="guardar">Guardar</button></div>`;

const wrapper = document.createElement("div")
wrapper.innerHTML = template;
return wrapper.childNodes.values()
};