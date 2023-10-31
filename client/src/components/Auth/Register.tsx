import { spawn } from "child_process";
import { useEffect, useState } from "react";

const Register : React.FC = ()=>
{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    // const [res, setRes] = useState<{success:boolean, message:string}>();
    const handleSubmit = async (e : React.FormEvent) =>
    {
        e.preventDefault();
        try
        {

            const response = await fetch('/register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${email}`
            })
            const data = await response.json();
            console.log(data.success, data.message);
            // setRes(data);
        }
        catch(err)
        {
            console.error('error,',err);
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

                    <div className="username-section">

                        <label htmlFor="username">username:</label>
                        <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        autoComplete="off" />

                    </div>

                    <div className="password-section">

                        <label htmlFor="password">password:</label>
                        <input type="password"
                        name='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        autoComplete="off" />

                    </div>
                    <div className="button-section">

                        <button type="submit" className="btn-template">register</button>

                    </div>

                </form>
                
            </div>
    )
}
export default Register;