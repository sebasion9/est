import Main from "../components/Content/Main";
import Navbar from "../components/Content/Navbar";
const Root : React.FC = ()=>
{

    return(
        <div className="grid">
            <Navbar/>
            <Main/>
        </div>
    )
}
export default Root;