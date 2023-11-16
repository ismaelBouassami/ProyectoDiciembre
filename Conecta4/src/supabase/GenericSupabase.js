export { saveGame ,loadGame};
// Configura tus credenciales y URL de Supabase
const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGt0bXJvbG9mdGFidHJ5bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0MzYsImV4cCI6MjAxNDg0MjQzNn0.9UCatd_9uVYjwsztpV1xbsOaM3PEq3gq_kBxJPXxBsM";
// Crea una instancia de Supabase
//const supabase = createClient(supabaseUrl, supabaseKey);

async function loadGame(state){
  let id = localStorage.getItem('IdPartidaSubida');
  console.log(id + " loaded id");
  // Verifica si id tiene un valor válido
  if (id) {
  let response = await fetch(`https://untktmroloftabtrymov.supabase.co/rest/v1/Game?id=eq.1&select=*id,state_game`, {
  method: "GET",
  headers: {
    apikey: supabaseKey,
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGt0bXJvbG9mdGFidHJ5bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0MzYsImV4cCI6MjAxNDg0MjQzNn0.9UCatd_9uVYjwsztpV1xbsOaM3PEq3gq_kBxJPXxBsM",
    "Content-Type": "application/json",
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
    }
    return response.json();
  })
  .then(data => {
    // Manejo de los datos obtenidos
    let stateGame = data[0]?.state_game; // Obtener el valor de state_game, asumiendo que hay solo un resultado
    console.log('Valor de state_game:', stateGame);
 
    console.log('Valor de id: ', data[0]?.id);
    return    data[0]?.state_game;
  })
  .catch(error => {
    // Manejo de errores
    console.error('Error durante la solicitud:', error);
    return    null;
  });
} else {
  console.error('El valor de id es undefined. Asegúrate de que id tenga un valor válido.');
  return    null;
}
}

async function saveGame(state) {
  let response = await fetch(
    "https://untktmroloftabtrymov.supabase.co/rest/v1/Game",
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGt0bXJvbG9mdGFidHJ5bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0MzYsImV4cCI6MjAxNDg0MjQzNn0.9UCatd_9uVYjwsztpV1xbsOaM3PEq3gq_kBxJPXxBsM",
        "Content-Type": " application/json",
        Prefer: " return=representation",
      },
      body: JSON.stringify({ state_game: state }),
    }
  )
  .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then(data => {
      console.log('Datos obtenidos:', data);

      // Extraer el ID del objeto de respuesta
      const nuevoID = data.id;

      // Almacenar el ID en LocalStorage
      localStorage.setItem('IdPartidaSubida', nuevoID);
    })
    .catch(error => {
      console.error('Error durante la solicitud:', error);
    });

}
