import multer from "multer";
import path from 'path';
import Db from "./db";
import conf from './conf/dbconf.json';
let db : Db = new Db;
db.configCon(conf);
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../src/uploads'),
    filename: (req,file,cb)=>
    {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
})

const upload = multer({storage:storage});
export {
    upload, db
}
