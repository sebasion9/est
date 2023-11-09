import { ReactElement } from "react";
import AddItem from "./AddItem";
import ItemList from "./ItemList";

// fetch from db
const ManageProducts : React.FC = ()=>
{
    return(
        <div className="mp-container">
            <Section mp_label="list items"
            content={<ItemList/>}
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
    content: ReactElement,
    footer?: ReactElement
}
const Section : React.FC<SectionProps> = ({mp_label,content,footer})=>
{

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