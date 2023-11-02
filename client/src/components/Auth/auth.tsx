import { NavigateFunction} from "react-router-dom";
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


const Logout  : React.FC<{logout : typeof handleLogout, navigate : NavigateFunction}> = 
    ({logout, navigate})=> 
{

    return <button className='logout-btn' onClick={()=>logout(navigate)}>logout</button>
}
const handleLogout = (navigate : NavigateFunction) =>
{
    document.cookie = "token=; Max-Age=0";
    navigate('/');
}

export
{
    Logout, handleLogout, getAuth
}    
