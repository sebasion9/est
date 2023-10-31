import React from 'react';
import { Link } from 'react-router-dom';
const items = [
    'search','categories','login/register'
]

//      ADD MORE ROUTING
const Navbar : React.FC = ()=>
{
    return (

        <nav className='navbar'>

            {items.map((item,index)=>
                {
                    if(item === "login/register")
                    {
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

