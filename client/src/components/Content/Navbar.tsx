import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAuth from '../Auth/auth';
const items = [
    'search','login/register'
]

//      ADD MORE ROUTING
const Navbar : React.FC = ()=>
{
    const [allowed, setAllowed] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    
    useEffect(()=>
    {
        getAuth('/auth')
        .then(res=>
            {
                if(!res)
                {
                    setAllowed(false);
                }
                else
                {
                    setUsername(res.username)
                    setAllowed(true);
                }
            })
    },[])

    return (

        <nav className='navbar'>

            {items.map((item,index)=>
                {
                    if(item === "login/register")
                    {
                        if(allowed)
                        {
                            return <NavItem index={index} item_name={username} link="/account" />
                        }
                        return <NavItem index={index} item_name={item} link="/sign_up" />
                    }
                    return <NavItem index={index} item_name={item} link='todo'/ >

                })}
        </nav>
    )
}
type ItemProps = {
    index : number,
    link : string,
    item_name: string
}

const NavItem : React.FC<ItemProps> = ({index, link, item_name})=>
{

    return(
        <div key={index} className="navbar-item">
            <Link to={link}>{item_name}</Link>
        </div>
    )
}

export default Navbar;

