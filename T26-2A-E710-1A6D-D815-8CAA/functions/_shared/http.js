export const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json;charset=utf-8','cache-control':'no-store',...headers}});
export const redirect=(url,status=302)=>new Response(null,{status,headers:{location:url}});
export function cookie(request,name){const value=request.headers.get('Cookie')?.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];return value?decodeURIComponent(value):null}
export function setCookie(name,value,options=''){return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Secure${options}`}
