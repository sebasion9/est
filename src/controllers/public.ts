import {Response, Request, Router} from 'express';
import path from 'path';

const pub = Router();

pub.get('/uploads/:image', (req:Request, res: Response)=>
{
    const imageName = req.params.image;
    const imagePath = path.join(__dirname, '../../src/uploads', imageName);
    res.sendFile(imagePath);
})
export default pub;