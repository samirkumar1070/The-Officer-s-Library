import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { register } from './controller/adminRegister.controller.js';
import { login } from './controller/adminLogin.controller.js';
import { logout } from './controller/adminLogout.controller.js';
import { getDetails, remove, saveDetail, countStudentsByTimeSlot } from './controller/studentDetails.controller.js';
import { connectDB } from './db/connect.db.js';
import verifyToken from './middleware/verifyToken.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(urlencoded({extended:false}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Welcome");
})

app.post('/register',register);
app.post('/login',login);
app.post('/logout', logout);
app.post('/add',verifyToken,saveDetail);
app.get('/view',verifyToken,getDetails);
app.delete('/delete/:id',verifyToken,remove);
app.get('/countStudentsByTimeSlot', countStudentsByTimeSlot);

app.listen(process.env.PORT,(err)=>{
    if(err) throw err;
    console.log("Server created at port 5000");
})

connectDB();