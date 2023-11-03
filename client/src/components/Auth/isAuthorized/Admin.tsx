import React, { useState, useEffect } from 'react';
import getAuth from '../auth';
const Admin : React.FC = ()=>
{
    const [code_status, setCode_status] = useState<string>('');
    const [allowed, setAllowed] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [role, setRole] = useState<string>('');
    useEffect(()=>
    {
        getAuth('/auth')
        .then(res=>
            {
                if(res && res.role !== 'user')
                {
                    setAllowed(true);
                    setUsername(res.username);
                    setRole(res.role);
                }
                else
                {
                    setAllowed(false);
                    setCode_status('403 forbidden');
                }
            })
    },[])

    if(allowed)
    {
        return(
            <>
                <div>welcome {username} </div>
                <div>your role : {role} </div>

            </>
        )
    }
    return <>{code_status}</>
}
export default Admin;