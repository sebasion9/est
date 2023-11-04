import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAuth from '../Auth/auth';
const accountIcon = require('./img/account.png');
const items = [
    'search','sign up'
]

//      ADD MORE ROUTING
const Navbar : React.FC = ()=>
{
    const [allowed, setAllowed] = useState<boolean>(true);
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
                    if(item === "sign up")
                    {
                        if(allowed)
                        {
                            return <NavItem
                            index={index} 
                            item_name={username} 
                            link="/account"
                            icon_src={accountIcon} />
                        }
                        return <NavItem index={index} item_name={item} link="/sign_up" icon_src={accountIcon}/>
                    }
                    return <NavItem index={index} item_name={item} link='todo'/ >

                })}
        </nav>
    )
}
type ItemProps = {
    index : number,
    link : string,
    item_name: string,
    icon_src? : string,
}

const NavItem : React.FC<ItemProps> = ({index, link, item_name, icon_src})=>
{

    return(
        <div key={index} className="navbar-item">
            <Link to={link}>{item_name}</Link>
            <div className="navbar-icon-wrapper">
                <img className='navbar-icon' src={icon_src} alt="" />
            </div>
        </div>
    )
}

export default Navbar;

