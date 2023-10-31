import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

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