import { useState } from "react";
import MutableSpan from "../../General/MutableSpan";
import { User } from "../../General/types";

const Profile : React.FC<ProfileProps> = ({user})=>
{
    const [isFocused, setisFocused] = useState<boolean[]>([false,false]);

    

    return(
        <>
        <div className="span-btn-container">
            <MutableSpan label="username: "
            value={user ? user.username : ""} 
            isMutated={isFocused[0]}
            />
            <button className="btn-template" onClick={()=>setisFocused([!isFocused[0],isFocused[1]])}>edit</button>
        </div>
    
        <div className="span-btn-container">

            <MutableSpan
            label="email: "
            value={user ? user.email : ""}
            isMutated={isFocused[1]}
            />
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