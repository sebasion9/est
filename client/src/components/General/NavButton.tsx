import { NavigateFunction, useNavigate} from "react-router-dom";
export type NavButtonProps = {location:string, label:string, callback? : ()=>void}


const NavButton : React.FC<NavButtonProps> =
({location,label, callback})=>
{

    const navigate = useNavigate();
    return<button className="btn-template" onClick={()=>{
        if(callback)
        {
            callback();
        }
        navigate(location);
    }}>{label}</button>
}
export
{
    NavButton
}