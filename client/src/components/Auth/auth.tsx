
export default async function getAuth(endpoint:string) : Promise<{username:string, role:string} | false>
{
    const response = await fetch(endpoint);
    let data;
    if(response.ok)
    {
        data = await response.json();
        let role = data.role;
        let username = data.username;
        return {username, role};
    }

    return false;
}

export
{
    // Logout, ToAdmin, 
    getAuth
}    
