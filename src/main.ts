import express from 'express';
import bodyParser from 'body-parser';
import conf from './db/dbconf.json';
import Db from './db/db_init';
import { User, randomId } from './db/user';

let db : Db = new Db;
db.configCon(conf);
const PORT = 3001;
let app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/login',(req,res)=>
{
    const body = req.body;
    let wrong = "wrong combination of username, password";
    db.checkAvailability(body.username, body.email).then(async db_res=>
        {
            if(db_res.message === "username taken")
            {
                await db.checkPassword(body.username, body.password).then(passRes=>
                    {
                        if(passRes)
                        {
                            res.status(200).json({ success: true, message: 'success'});
                            
                        }
                        else
                        {
                            res.status(200).json({success: false, message: wrong})
                        }
                    });
            }
            else
            {
                res.status(200).json({success: false, message: wrong});
            }

        });
    
})

app.post('/register',(req,res)=>
{
    const body = req.body;
    let user : User = {username: body.username, password: body.password, id: randomId(), email :body.email}
    db.checkAvailability(user.username,user.email).then(db_res=>
        {
            if(db_res.isAvailable)
            {
                db.registerUser(user);
                res.status(200).json({ success: true, message: db_res.message });
            }
            else
            {
                res.status(200).json({ success:false, message: db_res.message });
            }
        });
    

})
app.listen(PORT, ()=>
{
    console.log('server listening on',PORT)
})