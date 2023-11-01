import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const items = [
    'search','login/register'
]

//      ADD MORE ROUTING
const Navbar : React.FC = ()=>
{
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    useEffect(()=>
    {
        fetch('/home')
        .then(res=>
            {
                if(res.ok)return res.json();
            })
        .then(data=>
            {
                if(data)
                {
                    setLoggedIn(data.success);
                    setUsername(data.username);
                }
            })
        .catch(err=>
            {
                throw err;
                
            })
        
    },[])
    return (

        <nav className='navbar'>

            {items.map((item,index)=>
                {
                    if(item === "login/register")
                    {
                        if(loggedIn)
                        {
                            return(
                                <>
                                <div key={index} className='navbar-item'>
                                    <Link to="/account">{username}</Link>
                                </div>
                                
                                </>
                            )
                        }
                        return(
                        <div key={index} className="navbar-item">
                            
                            <Link to="/sign_up">{item}</Link>
                        </div>

                        ) 
                    }
                    return(
                        
                        <div key={index} className="navbar-item">
                        <Link to="todo">{item}</Link>
                        </div>
                    ) 

                })}
        </nav>
    )
}
export default Navbar;

