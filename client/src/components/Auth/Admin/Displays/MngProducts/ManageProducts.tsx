import { ReactElement } from "react";
import Item from "./Item";
import AddItem from "./AddItem";

// fetch from db
const labels = ['telega','z ludzmi','3','4','1','2','3','4','1','2','3','4']

const ManageProducts : React.FC = ()=>
{
    return(
        <div className="mp-container">
            <Section mp_label="list items"
            content={labels}
            footer={<span className="item-count">showing 20 of 100 results</span>}/> {/* temp*/}

            {/* <div className="mp-section"></div> add item, (description, price, name, img, COUNT++) */}
            <Section mp_label='add item'
            content={<AddItem/>}
            />
 

            <div className="mp-section">mng filters</div>

            <div className="mp-section">mng publishing</div> 
            {/* published items, publish/unpublish */}
        </div>
    )
}
type SectionProps = {
    mp_label:string,
    content: string[] | ReactElement, // temp Product[]
    footer?: ReactElement
}
const Section : React.FC<SectionProps> = ({mp_label,content,footer})=>
{
    
    if(Array.isArray(content))
    {
        return(
            <div className="mp-section-container">
                <span className="mp-label">{mp_label}</span>
                <div className="mp-section">
                {content.map((item,index)=>
                        {
                            return(
                            <Item key={index} label={item} id={"491hhu41h941dasdsadsa2h9421h92uj9j9u"}/>
                            )
                        })}
                </div>
                {footer}
            </div>
        )
    }
    return(
        <div className="mp-section-container">
            <span className="mp-label">{mp_label}</span>
            <div className="mp-section">
                {content}
            </div>
            {footer}
        </div>
    )
}

export default ManageProducts;