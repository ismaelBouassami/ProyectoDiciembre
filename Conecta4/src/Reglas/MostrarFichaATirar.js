export {mostrarFicha};


function mostrarFicha(state) {
  
  const ficha_a_tirar = new Array(1);
  ficha_a_tirar[0] = new Array(7);
  state.overCasilla = new Array(1); // Inicializa overCasilla como una matriz bidimensional
  state.overCasilla[0] = new Array(7).fill(0);

  
  
  return state; 
}
