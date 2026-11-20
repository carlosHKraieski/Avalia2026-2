import {cookie,setCookie} from './http.js';
const enc=b=>btoa(String.fromCharCode(...new Uint8Array(b))).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');const dec=s=>Uint8Array.from(atob(s.replaceAll('-','+').replaceAll('_','/')+'==='.slice((s.length+3)%4)),c=>c.charCodeAt(0));
async function sign(value,secret){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);return enc(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(value)))}
export async function token(payload,secret){const body=enc(new TextEncoder().encode(JSON.stringify(payload)));return `${body}.${await sign(body,secret)}`}
export async function verify(value,secret){try{const [body,sig]=value.split('.');if(!body||!sig)return null;const expected=await sign(body,secret);if(expected!==sig)return null;return JSON.parse(new TextDecoder().decode(dec(body)))}catch{return null}}
export async function sessionUser(request,env){const raw=cookie(request,'pb_session');return raw?verify(raw,env.SESSION_SECRET):null}
export async function requireUser(request,env){const user=await sessionUser(request,env);if(!user)throw new Response(JSON.stringify({error:'Autenticação necessária.'}),{status:401,headers:{'content-type':'application/json'}});return user}
export async function sessionCookie(user,env){return setCookie('pb_session',await token(user,env.SESSION_SECRET),'; Max-Age=604800')}
