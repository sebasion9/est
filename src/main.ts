import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import conf from './db/dbconf.json';
import Db from './db/db_init';
import { User } from './db/user';
import { randomId, hashPass } from './auth/crypto';
import { generateToken, authenticateJWT, rRequest } from './auth/jwt';
const PORT = 3001;

let db : Db = new Db;
db.configCon(conf);

let app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/login',(req,res)=>
{
    const body = req.body;
    let wrong = "bad combination";


    db.checkAvailability(body.username, body.email).then(async db_res=>
        {
            if(db_res.message === "username taken")
            {
                await db.checkPassword(body.username, body.password).then(async passRes=>
                    {
                        if(passRes)
                        {
                            let users = await db.user(body.username);
                            let user : User;
                            if(users)
                            {
                                user = users[0];
                                const accessToken = generateToken(user);
                                res.status(200).json({ success: true, message: 'success', accessToken});
                            }
                            else
                            {
                                res.status(200).json({success: false, message: 'somethign went wrong'});
                            }
                            
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

    let userID = randomId();
    const hashedPass = hashPass(body.password,userID);

    let user : User = {
        username: body.username, 
        password: hashedPass, 
        id: userID, 
        email :body.email,
        role: 'user'
    }
    
    db.checkAvailability(user.username,user.email).then(db_res=>
        {
            if(db_res.isAvailable)
            {
                db.registerUser(user);
                const accessToken = generateToken(user);
                res.status(200).json({ success: true, message: db_res.message, accessToken });
            }
            else
            {
                res.status(200).json({ success:false, message: db_res.message });
            }
        });
    

})


app.get('/auth', authenticateJWT, (req: rRequest, res)=>
{
    if(req.user)
    {
        res.status(200).json({username: req.user.username, role:req.user.role});
    }
    res.status(404).json({message:'something went wrong'});
})

app.post('/user', authenticateJWT, (req:rRequest,res)=>
{
    console.log('a');
    let username = req.body.username;
    let users : Promise<User[] | undefined>= db.user(username);
    let user : User;
    users.then(users=>
        {
            if(users)
            {
                user=users[0];
                res.status(200).json(user);
            }
            else
            {
                res.status(404).json({message:'something went wrong'});
            }
        })
    
})

app.listen(PORT, ()=>
{
    console.log('server listening on',PORT)
})