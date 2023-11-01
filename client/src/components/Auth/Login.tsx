import { useState } from "react";
import { UsrPass, postSubmit } from "./UsrPass";
import { useNavigate } from "react-router-dom";

const Login : React.FC = ()=>
{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [resMessage, setResMessage] = useState<string>('');
    const navigate = useNavigate();
    const handleSubmit = async (e : React.FormEvent) =>
    {
        e.preventDefault();
        let data = await postSubmit('/login', navigate, username, password);
        setResMessage(data.message);
        document.cookie = `token=${data.accessToken}`;
    }
    return (
            <div className="form-container">


                <form action="/login" onSubmit={handleSubmit}>
                <UsrPass 
                    username={username}
                    password={password}
                    setPassword={setPassword}
                    setUsername={setUsername}
                    handleSubmit={handleSubmit}
                    resMessage={resMessage}
                    isLogin={true}
                    />
                    
                </form>

        </div>
    )
}
export default Login;