import { Response, Router, Request } from 'express';
import path from "path";
import { Product, userRequest} from '../db/types';
import { authenticateJWT } from '../auth/jwt';
import { randomId } from '../auth/crypto';
import { db, upload } from '../db/db_conf';
const adminRouter = Router();


adminRouter.post('/upload_item', authenticateJWT, upload.single('image'), async (req:userRequest,res : Response)=>
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
                const uniqueSuffix = req.file.filename;
                const rel_path = path.join('uploads', uniqueSuffix);
                const size = req.file.size;

                item.id =  randomId();
                item.path = rel_path;
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
adminRouter.get('/products', async(req:userRequest, res : Response)=>
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

export default adminRouter;