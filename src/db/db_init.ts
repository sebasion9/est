import sql, { Connection, escape } from 'mysql';
import { User , isAvailableRes } from './user';

interface dbConfig
{
    host: string,
    user : string,
    password : string,
    database : string,
    port : number,
}


export default class Db
{
    private con? : Connection;

    public configCon = (config: dbConfig) =>
    {
        this.con = sql.createConnection(config);
    }
    
    
    public async user(username?:string, email?:string, id?:number) : Promise<User[] | undefined>
    {
    return new Promise(resolve=>
        {
            if(this.con)
            {
                if(username)
                {
                    let sql = 'select * from users where username = ' + escape(username);
                    this.con.query(sql, (err,result)=>
                    {
                        if(err)throw err;
                        resolve(result);
                    });  
                }
                else if(id)
                {
                    let sql = 'select * from users where id = ' + escape(id);
                    this.con.query(sql, (err,result)=>
                    {
                        if(err)throw err;
                        resolve(result);
                    }); 
                }
                else if(email)
                {
                    let sql = 'select * from users where email = ' + escape(email);
                    this.con.query(sql,(err,result)=>
                    {
                        if(err)throw err;
                        resolve(result);
                    })
                }
                else
                {
                    let sql = 'select * from users';
                    this.con.query(sql, (err,result)=>
                    {
                        if(err)throw err;
                        resolve(result);
                    })
                }
            }
            else
            {
                resolve(undefined);
            }

        })
    }
    public async checkAvailability(username:string, email:string) : Promise<isAvailableRes>
    {
        try
        {
            const userByUsername = await this.user(username, undefined, undefined);

            if(userByUsername && userByUsername.length>0)
            {
                return { isAvailable : false, message: 'username taken'};
            }
            const userByEmail = await this.user(undefined, email, undefined)

            if(userByEmail && userByEmail.length>0)
            {
                return { isAvailable : false, message: 'email taken'};
            }
            return { isAvailable : true, message : 'success'};
        }
        catch(err)
        {
            throw err;
        }

    }
    public async registerUser(user: User)
    {
        if(this.con)
        {
            let sql = 'insert into users (id, username, password, email) values (?, ?, ?, ?)';
            const values = [user.id, user.username, user.password, user.email];
            this.con.query(sql, values, (err,result)=>
            {
                if(err)
                {
                    throw err;
                };
                return true;
            })
        }
        return false;
    };
    public async checkPassword(username:string, password:string)
    {
        let users : User[] | undefined = await this.user(username);
        let user : User;
        if(users && users.length>0)
        {
            user = users[0];
            if(password === user.password)
            {
                return true;
            }
        }
        return false;
    }
}


