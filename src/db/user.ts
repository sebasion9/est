import crypto from 'crypto';

export type User = 
{
    id:string,
    username:string,
    password:string,
    email:string
}
export type isAvailableRes = {isAvailable : boolean, message: string}

export function randomId()
{
    return crypto.randomBytes(16).toString('hex');
}