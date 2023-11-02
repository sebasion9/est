import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAuth, { Logout, handleLogout } from './auth';

const Account : React.FC = ()=>
{
    const navigate = useNavigate();
    const [allowed, setAllowed] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [role, setRole] = useState<string>('');

    useEffect(()=>
    {
        getAuth('/auth')
        .then(res=>
            {
                if(res)
                {
                    setAllowed(true);
                    setUsername(res.username);
                    setRole(res.role);
                }
                else
                {
                    setAllowed(false);
                }
            })
    },[])
    // USER ACCOUNT PANEL


    if(allowed && role==='user')
    {
        return(
            <>
                <div>welcome {username} </div>
                <div>your role : {role} </div>
                <Logout logout={handleLogout} navigate={navigate}/>
            </>
        )
    }
    // ADMIN/S_ADMIN ACCOUNT PANEL

    if(allowed)
    {
        return(
            <>
                <div>welcome {username} </div>
                <div>your role : {role} </div>
                <Logout logout={handleLogout} navigate={navigate}/>
                <button onClick={()=>navigate('/admin')}>admin panel</button>
            </>
        )
    }

    return <>401 Unauthorized</>
}




export default Account;
