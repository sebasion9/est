import { NavigateFunction} from "react-router-dom";
export type NavButtonProps = {navigate : NavigateFunction, location:string, label:string, callback? : ()=>void}


const NavButton : React.FC<NavButtonProps> =
({navigate,location,label, callback})=>
{

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