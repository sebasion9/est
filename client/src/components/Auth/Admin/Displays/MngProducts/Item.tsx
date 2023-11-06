type ItemProps = {
    label:string,
    id:string;
}
const Item : React.FC<ItemProps> = ({label,id})=>
{
    return(
        <div className="item-container">
            <span className="item-name">{label}</span>
            <span className="item-id">{`id: ${id}`}</span>
            <button className="item-edit btn-template">edit</button>
            <button className="item-del btn-template">del</button>
        </div>
    )
}

export default Item;