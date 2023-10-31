import express from 'express';
import bodyParser from 'body-parser';
import conf from './db/dbconf.json';
import Db from './db/db_init';

let db : Db = new Db;
db.configCon(conf);

// db.user('',5).then(users=>
//     {
//         console.log(users);
//     })


const PORT = 3001;
let app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/login',(req,res)=>
{
    const username = req.body.username;

    console.log(req.body);
    res.status(200).json({ success: true});
})

app.post('/register',(req,res)=>
{
    const body = req.body;
    const username = body.username;
    const password = body.password;
    const email = body.email;

    db.user(username).then(user=>
        {
            if(user && user.length>0)
            {
                console.log('username taken');

            }
            else
            {
                db.user('',email,0).then(user=>
                    {
                        if(user && user.length>0)
                        {
                            console.log('email taken');
                        }
                        else
                        {
                            console.log('registered successfully');
                        }
                    })
            }
        })


    // console.log(req.body);

    res.status(200).json({ success: true });

})
app.listen(PORT, ()=>
{
    console.log('server listening on',PORT)
})