import express from 'express';
import morgan from 'morgan';
import userrouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import airoutes from './routes/ai.routes.js'
import postroutes from './routes/posts.routes.js'

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/',userrouter)
app.use('/ai',airoutes)
app.use('/post',postroutes)
export default app;
