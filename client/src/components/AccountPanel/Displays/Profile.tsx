import { User } from "../user";

const Profile : React.FC<ProfileProps> = ({user})=>
{
    return(
        <>
        <div className="span-btn-container">
            <span className="user-data">username: {user?.username}</span>
            <button className="btn-template">change</button>
        </div>
    
        <div className="span-btn-container">
            <span className="user-data">email: {user?.email}</span>
            <button className="btn-template">change</button>
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