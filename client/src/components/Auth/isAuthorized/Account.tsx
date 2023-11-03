import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAuth, { handleLogout } from '../auth';
import AccountPanel from '../../AccountPanel/AccountPanel';

const Account : React.FC = ()=>
{
    const navigate = useNavigate();
    const [code_status, setCode_status] = useState<string>('');
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
                    setCode_status('401 unauthorized');
                }
            })
    },[])
    // USER ACCOUNT PANEL


    if(allowed && role==='user')
    {
        return(
            <>
            <div className="ap-container">
                <AccountPanel logoutProps={{navigateHandler:handleLogout, navigate:navigate}} isAuthorized={false} username={username}/>
            </div>
            </>
        )
    }
    // ADMIN/S_ADMIN ACCOUNT PANEL

    if(allowed)
    {
        return(
            <>
            <div className="ap-container">
                <AccountPanel logoutProps={{navigateHandler:handleLogout, navigate:navigate}} isAuthorized={true} username={username}/>
            </div>
            </>
        )
    }

    return <>{code_status}</>
}


export default Account;
