import { ChangeEvent, useEffect, useState } from "react";
import filters from "../../../../General/filters.json";
const currencyRegex : RegExp = /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/;

const AddItem : React.FC = ()=>
{
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [file, setFile] = useState<File | null>();
    const [selectedFilter, setSelectedFilter] = useState<string>(filters.filters[0]);
    const [submitStatus, setSubmitStatus] = useState<string>('');

    const handleCurrency = (e : ChangeEvent<HTMLInputElement>)=>
    {
        const val = e.target.value;
        if(currencyRegex.test(val) || val.length === 0)
        {
            setPrice(val);
        }
    }
    const handleImageUpload = (e : ChangeEvent<HTMLInputElement>)=>
    {
        e.target.files ? setFile(e.target.files[0]) :  setFile(null);
    }
    useEffect(()=>
    {
        const checkProperties = async ()=>
        {
            let response = 'property(s): ';
            if(name.length<1)
            {
                response += 'name ';
            }
            if(description.length<1)
            {
                response += 'description ';
            }
            if(price.length<1)
            {
                response += 'price ';
            }
            if(!file)
            {
                response += 'image ';
            }
            response += 'are missing.';
            if(response === "property(s): are missing.")
            {
                
                setSubmitStatus('success');
                return;
            }
            setSubmitStatus(response);
        }
        checkProperties();
    },[name,description,price,file,selectedFilter])
    
    const handleSubmit = async ()=>
    {
        if(submitStatus !== "success")return;
        try
        {
            const formData = new FormData();
            formData.append('name',name);
            formData.append('description',description);
            formData.append('price',price);
            if(file)
            {
                formData.append('image',file);
            }
            if(selectedFilter)
            {
                formData.append('category', selectedFilter)
            }
            const response = await fetch('/upload_item',
            {
                method: 'POST',
                body: formData
            })

        }
        catch(error)
        {
            throw error;
        }
    }
    return(
        <div className="add-item-container">
            <input 
            className="add-item-txt-input" 
            type="text" 
            placeholder="item name" 
            onChange={(e)=>{setName(e.target.value);}}
            value={name}/>

            <input 
            className="add-item-txt-input" 
            type="text" 
            placeholder="description"
            onChange={(e)=>{setDescription(e.target.value)}}
            value={description}/>

            <input 
            className="add-item-txt-input"
            type="number" 
            placeholder="0.00"
                onChange={(e)=>{handleCurrency(e)}}
            value={price}/>

            <label className="add-item-txt-input add-item-file-input">
                upload img
                <input 
                type='file'
                onChange={(e)=>{handleImageUpload(e)}}
                accept="image/png, image/jpeg"/>
            </label>

            <select 
            id="add-item-list-input"
            value={selectedFilter}
            onChange={(e)=>setSelectedFilter(e.target.value)}>
            {filters.filters.map((filter,index)=>
                    {
                        return <option key={index} value={filter}>{filter}</option>
                    })}
            </select>

            <div className="button-section">
                <button className="btn-template" onClick={handleSubmit}>add</button>
            </div>
            <span 
            className={`add-item-response ${submitStatus==="success" ? 'ok' : 'notok'} `  }
            >{submitStatus}</span>
        </div>       
    )
}

export default AddItem;


