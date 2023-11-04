import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsrPass, postSubmit, validateEmail, validateUsername } from "./UsrPass";

const Register : React.FC = ()=>
{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [res, setRes] = useState<string>('');
    const navigate = useNavigate();
    const handleSubmit = async (e : React.FormEvent) =>
    {
        e.preventDefault(); 

        if(validateEmail(email) && validateUsername(username))
        {
            let data = await postSubmit('/register', navigate, username, password, email);
            setRes(data.message);
            document.cookie = `token=${data.accessToken}`;
        }
        else
        {
            setRes('enter valid email and valid username');
        }
    }



    return (
            <div className="form-container">

                <form action="/register"onSubmit={handleSubmit}>

                    <div className="email-section">

                        <label htmlFor="email">email:</label>
                        <input 
                        type="text" 
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        autoComplete="off" />

                    </div>
                    <UsrPass 
                    username={username}
                    password={password}
                    setPassword={setPassword}
                    setUsername={setUsername}
                    handleSubmit={handleSubmit}
                    resMessage={res}
                    isLogin={false}
                    />
                </form>
                
            </div>
    )
}
export default Register;