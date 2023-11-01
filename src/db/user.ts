export type User = 
{
    id:string,
    username:string,
    password:string,
    email:string,
    role: 's_admin' | 'admin' | 'user' 
}
export type isAvailableRes = {isAvailable : boolean, message: string}

