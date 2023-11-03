import { NavigateFunction} from "react-router-dom";

const ToAdmin : React.FC<LogoutProps> = 
({navigateHandler, navigate})=>
{
    return <button className='btn-template' onClick={()=>{navigateHandler(navigate)}}>admin</button>
}

const Logout  : React.FC<LogoutProps> = 
({navigateHandler, navigate})=> 
{
    
    return <button className='btn-template' onClick={()=>navigateHandler(navigate)}>logout</button>
}

const handleLogout = (navigate : NavigateFunction) =>
{
    document.cookie = "token=; Max-Age=0";
    navigate('/');
}
const handleToAdmin = (navigate : NavigateFunction)=>
{
    navigate('/admin');
}
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

export type LogoutProps = {navigateHandler : typeof handleLogout, navigate : NavigateFunction};

export
{
    Logout, ToAdmin, handleLogout, handleToAdmin, getAuth
}    
