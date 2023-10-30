export {mostrarFicha};


function mostrarFicha() {
  let primerafila = document.getElementById("ficha_a_tirar");
  const ficha_a_tirar = new Array(1);
  ficha_a_tirar[0] = new Array(7);
  const overCasilla = new Array(1); // Inicializa overCasilla como una matriz bidimensional
  overCasilla[0] = new Array(7);

  for (let i = 0; i < 7; i++) {
    const celdaFicha = document.createElement("div");
    celdaFicha.classList.add("casillaover"); // Puedes agregar estilos CSS para celdas si lo deseas
    ficha_a_tirar[0][i] = celdaFicha;
    primerafila.append(celdaFicha);
    
    // Llena overCasilla con las mismas celdas
    overCasilla[0][i] = celdaFicha;
  }
  
  return overCasilla; // Devuelve overCasilla en lugar de primerafila
}
