export { saveGame ,loadGame,getData,updateData,supabaseKey,supabaseUrl,updateProfileData, supaRequest,headers,getFileRequest,fileRequest,getDataForm};
// Configura tus credenciales y URL de Supabase
const supabaseUrl = "https://untktmroloftabtrymov.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudGt0bXJvbG9mdGFidHJ5bW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY0MzYsImV4cCI6MjAxNDg0MjQzNn0.9UCatd_9uVYjwsztpV1xbsOaM3PEq3gq_kBxJPXxBsM";
const headers = {
  apiKey: supabaseKey,
  'Content-Type': 'application/json',
};
// Crea una instancia de Supabase
//const supabase = createClient(supabaseUrl, supabaseKey);


async function getFileRequest(url, token) {
  const headersFile = {
    apiKey: supabaseKey,
    Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${url}`, {
    method: 'GET',
    headers: headersFile,

  });
  if (response.status >= 200 && response.status <= 300) {
    if (response.headers.get('content-type')) {
      const datos = await response.blob();
      return datos;
    }
    return {};
  }

  return Promise.reject(await response.json());
}
async function supaRequest(url, method, headers, body) {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body), // En cas d'enviar dades per post, put patch...
  });
  if (response.status >= 200 && response.status <= 300) { // En cas d'error en el servidor
    if (response.headers.get('content-type')) { // Si retorna un JSON
      return await response.json();
    }
    return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
  }

  return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject.
}
async function getData(id) {
  const url = `https://untktmroloftabtrymov.supabase.co/rest/v1/Game?id=eq.${id}&select=*id,state_game`;
  const headersAux = { ...headers, Authorization: `Bearer ${supabaseKey}` };
  const data = await supaRequest(url, 'get', headersAux);
  let ids= localStorage.setItem("ID_update",data[0]?.id);
  return data[0]?.state_game;
}
async function getDataForm(URI) {
  const url = `https://untktmroloftabtrymov.supabase.co/rest/v1/${URI}`;
  const headersAux = { ...headers, Authorization: `Bearer ${supabaseKey}` };
  const data = await supaRequest(url, 'get', headersAux);
  return data;
}

async function updateProfileData(URI, token, data) {
  const url = `${supabaseUrl}/rest/v1/${URI}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'PATCH', headersAux, data);
  return response;
}
async function updateData(data) {
  let id= localStorage.getItem("ID_update");
  console.log(id+"id del update");
  const url = `https://untktmroloftabtrymov.supabase.co/rest/v1/Game?id=eq.${id}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${supabaseKey}`,
    Prefer: 'return=minimal',
  };
  const response = await supaRequest(url, 'PATCH', headersAux, {state_game :data});
  return response;
}
async function loadGame(id){
  
  if (id) {
  let response = await fetch(`https://untktmroloftabtrymov.supabase.co/rest/v1/Game?id=eq.${id}&select=*id,state_game`, {
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
  const uid= localStorage.getItem("uid");
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
      body: JSON.stringify({state_game: state ,uid:uid}),
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
async function fileRequest(url, body, token) {
  console.log("Entra aqui");
  const headersFile = {
    apiKey: supabaseKey,
    Authorization: `Bearer ${token}`,
    'x-upsert': true, // Necessari per a sobreescriure
  };
  const response = await fetch(`${supabaseUrl}${url}`, {
    method: 'POST',
    headers: headersFile,
    body,
  });
  if (response.status >= 200 && response.status <= 300) {
    if (response.headers.get('content-type')) {
      const datos = await response.json(); // Retorna un json amb la ruta relativa.
      datos.urlAvatar = `${supabaseUrl}${url}`; // El que
      return datos;
    }
    return {};
  }

  return Promise.reject(await response.json());
}
