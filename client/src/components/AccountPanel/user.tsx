export type User = 
{
    id:string,
    username:string,
    password?:string,
    email:string,
    role: 's_admin' | 'admin' | 'user' 
}

export async function fetchByUsername(username:string) : Promise<User>
{
    let response = await fetch('/user',
    {
        method: 'POST',
        headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        body: `username=${username}`
    })
    let data = await response.json();
    
    return data;
}


// let response = fetch('/user',
// {
//     method: 'POST',
//     headers: {"Content-Type" : "application/x-www-form-urlencoded"},
//     body: `username=${username}`

// })

// let data = response.then(res=>
//     {
//       return res.json();  
//     })

// data.then(user=>
//     {
//         setUser(user);
//     })