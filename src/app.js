import express from 'express';
import morgan from 'morgan';
import userrouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/',userrouter)
export default app;
