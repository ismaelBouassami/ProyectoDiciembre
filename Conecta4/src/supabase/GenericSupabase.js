export { saveGame };
// Configura tus credenciales y URL de Supabase
const supabaseUrl = "https://your-supabase-url.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGt0bXJvbG9mdGFidHJ5bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0MzYsImV4cCI6MjAxNDg0MjQzNn0.9UCatd_9uVYjwsztpV1xbsOaM3PEq3gq_kBxJPXxBsM";

// Crea una instancia de Supabase
//const supabase = createClient(supabaseUrl, supabaseKey);

async function  loadGame(state,id){
let reponse = await fetch('https://untktmroloftabtrymov.supabase.co/rest/v1/Games Conecta4?select=id,stateGame',{
    method :"GET",
    headers:{
    apikey: supabaseKey,
    Authorization:" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGt0bXJvbG9mdGFidHJ5bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0MzYsImV4cCI6MjAxNDg0MjQzNn0.9UCatd_9uVYjwsztpV1xbsOaM3PEq3gq_kBxJPXxBsM",
    'Content-Type': 'application/json',
    }
});
}
async function saveGame(state) {
  let response = await fetch(
    "https://untktmroloftabtrymov.supabase.co/rest/v1/Games Conecta4",
    {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGt0bXJvbG9mdGFidHJ5bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0MzYsImV4cCI6MjAxNDg0MjQzNn0.9UCatd_9uVYjwsztpV1xbsOaM3PEq3gq_kBxJPXxBsM",
        "Content-Type": " application/json",
        Prefer: " return=representation",
      },
      body: JSON.stringify({ stateGame: state }),
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
