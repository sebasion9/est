import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getAuth from '../Auth/auth';
import AccountPanel from './Panel';
import { NavButton } from '../General/NavButton';
import ReturnSect from '../General/ReturnSect';

const Account : React.FC<{account_labels:string[]}> = ({account_labels})=>
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
                <AccountPanel navigate={navigate} isAuthorized={false} username={username} accountLabels={account_labels}/>
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
                <AccountPanel navigate={navigate} isAuthorized={true} username={username} accountLabels={account_labels}/>
            </div>
            </>
        )
    }

    return <ReturnSect code_status={code_status}/>;
}


export default Account;
