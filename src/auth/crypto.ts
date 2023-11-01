import crypto from 'crypto';
export function randomId()
{
    return crypto.randomBytes(16).toString('hex');
}

export function hashPass(password:string, salt:string) : string
{
    return crypto.createHash("sha256").update(password + salt).digest('hex');

}