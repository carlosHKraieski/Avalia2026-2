export async function onRequestGet(){return new Response(null,{status:302,headers:{location:'/', 'set-cookie':'pb_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure'}})}
