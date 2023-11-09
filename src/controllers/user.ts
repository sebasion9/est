import {Response, Request, Router} from 'express';
import { authenticateJWT } from '../auth/jwt';
import { Product, User, userRequest } from '../db/types';
import { db } from '../db/db_conf';
const userRouter = Router();

userRouter.get('/auth', authenticateJWT, (req: userRequest, res : Response)=>
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

userRouter.post('/user', authenticateJWT, async (req:userRequest,res : Response)=>
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
userRouter.post('/change_username', authenticateJWT, async (req:userRequest,res)=>
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

export default userRouter;