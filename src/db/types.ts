export type User = 
{
    id:string,
    username:string,
    password:string,
    email:string,
    role: 's_admin' | 'admin' | 'user' 
}
export type isAvailableRes = {isAvailable : boolean, message: string}

export type Product =
{
    id:string,
    name:string,
    description:string,
    price:string,
    category:string,
    path:string,
    size:number
}