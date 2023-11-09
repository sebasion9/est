import {Request, Response , Router} from 'express';
import { generateToken } from '../auth/jwt';
import { hashPass, randomId } from '../auth/crypto';
import { User } from '../db/types';
import { db } from '../db/db_conf';
const loginRouter = Router();

loginRouter.post('/login',(req : Request,res : Response)=>
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
loginRouter.post('/register', (req: Request, res : Response)=>
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

export default loginRouter;