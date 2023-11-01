import React, { useEffect, useState } from 'react';
const Account : React.FC = () =>
{
    const [token, setToken] = useState<string>('');
    const [allow, setAllow] = useState<boolean>(false);
    useEffect(()=>
    {
        fetch('/account')
        .then(res=>
            {
                if(res.ok) return res.json();
            })
        .then(data=>
            {
                if(data)
                setAllow(data.success);
            })
        .catch(error=>
            {
                throw error;
            })

    },[])
    return <div>
        {allow ? "welcome, youre allowed" : "youre not allowed"}
    </div>
}
export default Account;