import { useEffect, useState } from "react";
import { Product } from "../../../../General/types";
import { fetchProducts } from "../../../../General/fetch";
import Item from "./Item";

const ItemList : React.FC = ()=>
{
    const [items, setItems] = useState<Product[]>([]);
    useEffect(()=>
    {
        fetchProducts(setItems, '/products');
    },[])

    return(
        <>
            {items.map((item,index)=>
            {
                return <Item label={item.name} id={item.id} key={index}/>
            })}
        </>
    )
}

export default ItemList;