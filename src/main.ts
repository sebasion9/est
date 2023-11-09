import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import adminRouter from './controllers/admin';
import loginRouter from './controllers/login';
import userRouter from './controllers/user';
import pub from './controllers/public';
const PORT = 3001;
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(adminRouter);
app.use(loginRouter);
app.use(userRouter);
app.use(pub);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, ()=>
{
    console.log('server listening on',PORT)
})