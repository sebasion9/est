export type User = 
{
    id:string,
    username:string,
    password?:string,
    email:string,
    role: 's_admin' | 'admin' | 'user' 
}

export async function fetchByUsername(username:string)
{
    let response = await fetch('/user',
    {
        method: 'POST',
        headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        body: `username=${encodeURIComponent(username)}`
    })
    let data = await response.json();
    if(data.user)data.user.password='';
    
    return data;
}


