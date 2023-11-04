import { useState } from "react";
import MutableSpan from "../../General/MutableSpan";
import { User } from "../user";

const Profile : React.FC<ProfileProps> = ({user})=>
{
    const [isFocused, setisFocused] = useState<boolean>(false);
    const toggleFocus = ()=>
    {
        setisFocused(!isFocused);
    }


    

    return(
        <>
        <div className="span-btn-container">
            <MutableSpan label="username: "
            value={user ? user.username : ""} 
            isMutated={isFocused}
            />
            <button className="btn-template" onClick={toggleFocus}>edit</button>
        </div>
    
        <div className="span-btn-container">
            <span className="user-data">email: {user?.email}</span>
            <button className="btn-template">edit</button>
        </div>
        
        <div className="span-btn-container">
            <span className="user-data">role: {user?.role}</span>
        </div>

        <div className="span-btn-container">
            <span className="user-data">id: {user?.id}</span>
        </div>
        
        </>
    )
}
export type ProfileProps = 
{
    user: User | undefined

}
export default Profile;