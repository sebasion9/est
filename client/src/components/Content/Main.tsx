import React from 'react';
const test_items = [
    '1','2','3','4','5','6','1','2','3','4','5','6','1','2','3','4','5','6'
]
// const rico = require('./img/rico.jpg');
const b_telega = require('./img/telega.jpg');
const telega = require('./img/xDD.jpg');
const ppl_telega = require('./img/telega-ppl.jpg');

//  STATIC RENDERING

const Main : React.FC = ()=>
{
    return (
        <main className='main'>
            {test_items.map((item,index)=>
            {
                let mod = index%3;
                if(mod === 0)
                {
                    return <ItemCard key={index} name='telega z ludzmi' img_path={ppl_telega}/>
                }
                if(mod === 1)
                {
                    return <ItemCard key={index} name='barrel telega' img_path={b_telega}/>
                }
                if(mod === 2)
                {
                    return <ItemCard key={index} name='telega' img_path={telega}/>
                }
            })}
        </main>
    )
}
export default Main;
//       //////////


type ItemCardProps = {
    name:string;
    img_path:string;
}
//  ADD DESCRIPTION ETc.

const ItemCard : React.FC<ItemCardProps> = (item: ItemCardProps)=>
{
    return(
        <div className='card-container'>

            <div className='card-img-wrapper'>
                <img className='card-img' 
                src={item.img_path}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            </p>
            
        </div>
    )
}