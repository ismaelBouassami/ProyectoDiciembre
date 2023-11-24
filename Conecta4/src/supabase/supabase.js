export {loginSupabase,signUpSupabase,logoutSupabase,recoverPasswordSupabase}

import {supaRequest,headers} from './GenericSupabase.js';
const urlBase= "https://untktmroloftabtrymov.supabase.co";
async function loginSupabase(email, password) {
  const url = `${urlBase}/auth/v1/token?grant_type=password`;
  const data = await supaRequest(url, 'post', headers, { email, password });
  return data;
}

async function signUpSupabase(email, password) {
  const url = `${urlBase}/auth/v1/signup`;
  const data = await supaRequest(url, 'post', headers, { email, password });
  return data;
}

async function logoutSupabase(token) {
  const url = `${urlBase}/auth/v1/logout`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, 'post', headersAux, {});
  return data;
}

async function recoverPasswordSupabase(email) {
  const url = `${urlBase}/auth/v1/recover`;
  const headersAux = { ...headers };
  const data = await supaRequest(url, 'post', headersAux, { email });
  return data;
}