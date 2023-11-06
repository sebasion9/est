import React, { useState, useEffect } from 'react';
import getAuth from '../auth';
import { LeftBarItem } from '../../AccountPanel/Panel';
import Display from './Display';
import { NavButton } from '../../General/NavButton';
import { useNavigate } from 'react-router-dom';
import ReturnSect from '../../General/ReturnSect';
type AdminProps = {
    leftbar_labels : string[]
}

const Admin : React.FC<AdminProps> = ({leftbar_labels})=>
{
    const navigate = useNavigate();
    const [code_status, setCode_status] = useState<string>('');
    const [allowed, setAllowed] = useState<boolean>(false);
    const [clickedItem, setClickedItem] = useState<string>(leftbar_labels[0]);

    useEffect(()=>
    {
        getAuth('/auth')
        .then(res=>
            {
                if(res && res.role !== 'user')
                {
                    setAllowed(true);

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
            <div className="ap-container">
                <nav className='ap-left-bar'>

                {leftbar_labels.map((item,index)=>
                {
                    return <LeftBarItem
                    label={item}
                    key={index}
                    onClick={()=>setClickedItem(item)}
                    isClicked={clickedItem === item} />
                })}
                <div className="button-section">
                    <NavButton  location='/' label='shop'/>
                    <NavButton  location={'/'} label="logout" callback={()=>{document.cookie = "token=; Max-Age=0";}}/>         
                    <NavButton  location="/account" label="account"/>
                </div>
                </nav>

                <main className="ap-main-content">
                    <Display display={clickedItem}/>
                </main>
            </div>
        )
    }
    return <ReturnSect code_status={code_status}/>
}
export default Admin;