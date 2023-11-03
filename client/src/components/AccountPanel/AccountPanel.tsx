import { ReactElement, useEffect, useState } from "react";
import { Logout, LogoutProps, ToAdmin, handleToAdmin } from "../Auth/auth";
import Profile from "./Displays/Profile";
import { User, fetchByUsername } from "./user";
export type apProps = {
    logoutProps : LogoutProps;
    isAuthorized : boolean;
    username : string
}


const labels = ['profile', 'settings', 'history', 'franzl']


const AccountPanel : React.FC<apProps> = ({logoutProps, isAuthorized, username})=>
{
    const handleLogout = logoutProps.navigateHandler;
    const navigate = logoutProps.navigate;
    const [clickedItem, setClickedItem] = useState<string>(labels[0]);
    const [user, setUser] = useState<User>();
    const toggleClicked = (item: string)=>
    {
        setClickedItem(item);
    }
    useEffect(()=>
    {
        // in future also fetch history, cart data etc
        fetchByUsername(username).then(user=>
            {
                setUser(user);
            })

    },[])
    if(isAuthorized)
    {
        return (
            <>
                <nav className='ap-left-bar'>

                    {labels.map((item,index)=>
                    {
                        return <LeftBarItem
                        label={item}
                        key={index}
                        onClick={()=>toggleClicked(item)}
                        isClicked={clickedItem === item} />
                    })}                    
                    
                <div className="button-section">
                    <Logout navigateHandler={handleLogout} navigate={navigate}/>
                    <ToAdmin navigateHandler={handleToAdmin} navigate={navigate}/>
                </div>

                </nav>

                <main className="ap-main-content">
                    <APMainDisplay display={clickedItem} user={user}/>
                </main>
            </>
        )

    }

    return (
        <>
            <nav className='ap-left-bar'>
                    {labels.map((item,index)=>
                    {
                        return <LeftBarItem
                        label={item}
                        key={index}
                        onClick={()=>toggleClicked(item)}
                        isClicked={clickedItem === item} />
                    })}   
            <div className='button-section'>
                <Logout navigateHandler={handleLogout} navigate={navigate}/>
            </div>
            </nav>
            <main className="ap-main-content">
                <APMainDisplay display={clickedItem} user={user}/>
            </main>
        </>
    )
    
}

//////////////

type LeftBarItemProps = {
    label:string,
    onClick: ()=>void,
    isClicked : boolean
}
const LeftBarItem : React.FC<LeftBarItemProps> = ({label, onClick, isClicked})=>
{
    return(
        <div className={`ap-left-bar-item ${isClicked ? 'clicked' : ''}`} onClick={onClick}>
            {label}
        </div>
    )
}

//////////////
type APMainDisplayProps = 
{
    display:string,
    user:User | undefined
}

const APMainDisplay : React.FC<APMainDisplayProps> = ({display,user})=>
{
    switch (display)
    {
        case 'profile':
            return (
                <APMainItem content={
                    <>
                        <Profile user={user}/>
                    </>
                }/>
            )
    }
    return (
        <></>
    )
}

//////////////

type APMainItemProps = {
    content: ReactElement;
}

const APMainItem : React.FC<APMainItemProps> = ({content})=>
{
    return(
        <div className="ap-main-content-item">
            {content}
        </div>
    )
}
export default AccountPanel;