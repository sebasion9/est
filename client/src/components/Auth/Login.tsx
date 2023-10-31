import { useState } from "react";

const Login : React.FC = ()=>
{
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handleSubmit = async (e : React.FormEvent) =>
    {
        e.preventDefault();
        try
        {

            const response = await fetch('/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
            })
            const data = await response.json();
            console.log(data.success);
        }
        catch(err)
        {
            console.error('error,',err);
        }

    }
    return (
            <div className="form-container">


                <form action="/login" onSubmit={handleSubmit}>
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

                        <button type="submit" className="btn-template">login</button>

                    </div>
                    
                </form>

        </div>
    )
}
export default Login;