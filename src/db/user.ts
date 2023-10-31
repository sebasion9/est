export type User = 
{
    id:number,
    username:string,
    password:string,
    email:string
}
export type isAvaibleRes = 'username_taken' | 'email_taken' | 'avaible' | undefined;