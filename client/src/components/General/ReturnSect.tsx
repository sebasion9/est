import { useNavigate } from "react-router-dom";
import { NavButton } from "./NavButton"

const ReturnSect : React.FC<{code_status:string}> = ({code_status})=>
{
    const navigate = useNavigate();
    return(
        <div className='return-section'>
            
            <span>{code_status}</span>
            <div>
                <NavButton label="login" location='/sign_up'/>
                <NavButton label="shop" location='/'/>
            </div>
        </div>
    )
}

export default ReturnSect;