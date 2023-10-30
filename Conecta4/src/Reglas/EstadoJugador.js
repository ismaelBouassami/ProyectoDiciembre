export { ComprobarJugador };

function ComprobarJugador(statecopy) {
    let player = document.getElementById("jugadorColor");
    console.log(statecopy);
    console.log(statecopy.jugadorRojo); // Cambia JugadorEnCurso a juegoEnCurso
    if (statecopy.jugadorRojo) { // Cambia JugadorRojo a jugadorRojo
        console.log("JugRojo");
        player.classList.remove("JugadorAzul");
        player.classList.add("JugadorRojo");
        player.innerHTML = "JugadorRojo";
    } else {
        console.log("JugAzul");
        player.classList.remove("JugadorRojo");
        player.classList.add("JugadorAzul");
        player.innerHTML = "JugadorAzul";
    }
}

