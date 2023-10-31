import sql, { Connection, escape } from 'mysql';
import { User , isAvaibleRes } from './user';

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
    
    
    public async user(username?:string, email?:string, id?:number,) : Promise<User[] | undefined>
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

}


