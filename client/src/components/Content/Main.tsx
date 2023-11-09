import React, { useEffect, useState } from 'react';
import { Product } from '../General/types';
import { fetchProducts } from '../General/fetch';

//  STATIC RENDERING

const Main : React.FC = ()=>
{
    const [items, setItems] = useState<Product[]>([]);
    useEffect(()=>
    {
        fetchProducts(setItems, '/products');

    },[])
    return (
            // return <ItemCard key={index} name='kibitka' img_path={kibitka}/>
        <main className='main'>
            {items.map((item,index)=>
            {
                return <ItemCard key={index} path={item.path} id={item.id} description={item.description} name={item.name} price={item.price} category={item.category}/>
            })}
        </main>
    )
}
export default Main;
//       //////////



//  ADD DESCRIPTION ETc.

const ItemCard : React.FC<Product> = (item: Product)=>
{
    return(
        <div className='card-container'>

            <div className='card-img-wrapper'>
                <img className='card-img' 
                src={`${item.path}`}
                />

            </div>

            <div className="section-container">

                <div className='span-section'>

                    <span className='card-name'>{item.name}</span>
                    <span className='card-price'>159.99 zl</span>
                    <span></span>

                </div>

                <div className='button-section'>

                    <button className='btn-template'>buy now</button>

                </div>

            </div>

            <p className='card-description'>                
                {item.description}
            </p>
            
        </div>
    )
}