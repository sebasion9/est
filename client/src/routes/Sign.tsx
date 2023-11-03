import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Login/Register";

const Sign : React.FC = ()=>
{

    return(
        <div className="wrapper">
            <Login/>
            <Register/>
        </div>
    )
}
export default Sign;