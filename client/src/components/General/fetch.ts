import { Product } from "./types";

export async function fetchByUsername(username:string)
{
    let response = await fetch('/user',
    {
        method: 'POST',
        headers: {"Content-Type" : "application/x-www-form-urlencoded"},
        body: `username=${encodeURIComponent(username)}`
    })
    let data = await response.json();
    if(data.user)data.user.password='';
    
    return data;
}
type ProductEndpoint = "/products" | "/published_items";

export const fetchProducts = async (setItems : React.Dispatch<React.SetStateAction<Product[]>>, endpoint: ProductEndpoint)=>
{
    let res = await fetch(endpoint);
    if(!res.ok)console.log('fetching data went wrong');
    const data = await res.json();
    let products : Product[] = data.products;
    data ? setItems(products) : setItems([]);
}

export default async function getAuth(endpoint:string) : Promise<{username:string, role:string} | false>
{
    const response = await fetch(endpoint);
    let data;
    if(response.ok)
    {
        data = await response.json();
        let role = data.role;
        let username = data.username;
        return {username, role};
    }

    return false;
}