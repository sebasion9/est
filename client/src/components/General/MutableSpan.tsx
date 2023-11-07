import { useEffect, useRef, useState } from "react";
import { User, fetchByUsername } from "../AccountPanel/user";
import { NavButton } from "./NavButton";
import { useNavigate } from "react-router-dom";
import { validateUsername } from "../Auth/Login/UsrPass";

type MutablSpanProps = 
{
    label:string,
    isMutated:boolean,
    value:string,
    // submitChange: ()=>void;
}
const MutableSpan : React.FC<MutablSpanProps> =
({label, isMutated, value})=>
{
    
    const [editableValue, setEditableValue] = useState<string>(value);
    const [u_IsAvailable, setU_IsAvailable] = useState<boolean>(false);
    const contentEditableRef = useRef<HTMLSpanElement>(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        if (isMutated && contentEditableRef.current) {
            contentEditableRef.current.innerHTML = value;
            contentEditableRef.current.focus();
            //
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(contentEditableRef.current);
            range.collapse(false);
            selection?.removeAllRanges();
            selection?.addRange(range);
            //
            
        }
    }, [isMutated, value]);
    useEffect(()=>
    {
        async function checkUsername()
        {
            let response = await fetchByUsername(editableValue);
            if(!response.userFound && validateUsername(editableValue))
            {
                setU_IsAvailable(true);
            }
            else
            {
                setU_IsAvailable(false);
            }
        }
        checkUsername();


    },[editableValue])
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLSpanElement>) => {

        if (e.key === "Enter") {
            e.preventDefault();
            if(u_IsAvailable)
            {
                await changeUsername(editableValue);
            }
        }
    };
    
    const handleInputChange = async (e: React.ChangeEvent<HTMLSpanElement>)=>
    {
        setEditableValue(e.target.textContent || "");
        setU_IsAvailable(false);

        
    };
    
    const changeUsername = async (newUsername:string)=>
    {
        console.log(value,newUsername);
        let response = await fetch('/change_username',
        {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: `username=${encodeURIComponent(value)}&newusername=${encodeURIComponent(newUsername)}`
        })
        document.cookie = "token=; Max-Age=0";
        navigate('/');
    }
    if(isMutated)
    {
        return(
            <>
            <span className="user-data">{label}</span>
            <span 
            className={`user-data ${u_IsAvailable ? 'avaiable' : 'not-avaiable'}`} 
            contentEditable="true"
            onKeyDown={handleKeyDown}
            onInput={handleInputChange}
            ref={contentEditableRef}
            >
                {value}
            </span>
            {u_IsAvailable ? <NavButton
            label="submit"
            location="/account"
            callback={()=>changeUsername(editableValue)}
            /> : <></>}
            </>
        )
    }
    return (
        <>
        <span className="user-data">{label}</span>
        <span className="user-data">{value}</span>
        </>
    )
}

export default MutableSpan