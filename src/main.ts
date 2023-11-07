import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import conf from './db/dbconf.json';
import Db from './db/db_init';
import { Product, User } from './db/types';
import { randomId, hashPass } from './auth/crypto';
import { generateToken, authenticateJWT, rRequest } from './auth/jwt';
const PORT = 3001;

let db : Db = new Db;
db.configCon(conf);

let app = express();
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
    destination: (req,file,cb)=>
    {
        cb(null, 'src/db/imgs/');
    },
    filename: (req,file,cb)=>
    {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
})

const upload = multer({storage:storage});


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
    else
    {
        res.status(404).json({message:'something went wrong'});
        
    }
})

app.post('/user', authenticateJWT, async (req:rRequest,res)=>
{
    let username = req.body.username;
    let users : User[] | undefined =  await db.user(username);
    if(users && users.length>0)
    {
        res.status(200).json({userFound:true, user: users[0]});
    }
    else
    {
        res.status(200).json({userFound:false, user: undefined})
    }
})
app.post('/upload_item', authenticateJWT, upload.single('image'), async (req:rRequest,res)=>
{
    if(req.user)
    {
        if(req.user?.role === "admin" || req.user?.role === "s_admin")
        {

            // console.log(req.body);
            if(req.file)
            {
                // const {name, description, price, category} = req.body;
                const item: Product = req.body;
                const abs_path = __dirname + '\\..\\' + req.file.path;
                const size = req.file.size;
                item.id =  randomId();
                item.path = abs_path;
                item.size = size;

                if(await db.registerProduct(item))
                {
                    res.status(200).json({message:'success'});

                }
                else
                {
                    res.status(200).json({message:'failed'});
                }

            }
            else res.status(200).json({message: 'failed'});
            
        }
        else
        {
            res.status(401).json({message:'unauthorized'});
        }
    }
    else
    {
        res.status(401).json({message:'unauthorized'});

    }
})
app.get('/products', async(req:rRequest, res)=>
{
    let products = await db.product();
    if(products)
    {
        res.status(200).json({products});
    }
    else
    {

        res.status(200).json({message: 'failed'});
    }
    
})

app.post('/change_username', authenticateJWT, async (req:rRequest,res)=>
{
    let result = await db.updateUsername(req.body.username, req.body.newusername);
    if(result)
    {
        res.status(200).json({success:true});
    }
    else
    {
        res.status(200).json({success:false});
    }
})

app.listen(PORT, ()=>
{
    console.log('server listening on',PORT)
})