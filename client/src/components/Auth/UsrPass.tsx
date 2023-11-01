import React from 'react';
import { NavigateFunction } from 'react-router-dom';
const EMAILREGEX : RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface UsrPassProps {
    username: string;
    password: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    resMessage: string;
    isLogin : boolean
}

export const UsrPass : React.FC<UsrPassProps> = (
    {
        username, password, setUsername, setPassword, handleSubmit, resMessage, isLogin
    })=>
{
    
    return(
        <>
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

            <button type="submit" className="btn-template">
                {isLogin ? 'login' : 'register'}
            </button>

        </div>

        <div className="res-section">
            <span className="res">{
                 resMessage
            }</span>
        </div>

        </>
    )
}

export async function postSubmit(endpoint: string, navigate: NavigateFunction, username:string, password: string, email? : string) : Promise<any>
{
    let bodyValue : string;
    email ? bodyValue =  `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&email=${email}`
          : bodyValue = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        
    try
    {
        const response = await fetch(endpoint,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                body: bodyValue 
            })
        const data = await response.json();
        if(data.success)
        {
            navigate('/');
            return data;
        }
        return data;
    }
    catch(err)
    {
        throw err;
    }
}

export function validateEmail(email:string)
{
    return EMAILREGEX.test(email);
}

