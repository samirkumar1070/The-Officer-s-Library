import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { registerUser } from './controller/libraryRegister.controller.js';
import { loginUser } from './controller/libraryLogin.controller.js';
import { logoutUser } from './controller/libraryLogout.controller.js';
import { getDetails, remove, saveDetail, countStudentsByTimeSlot } from './controller/student.controller.js';
import { addPayment,getPayments } from './controller/studentPayment.cotroller.js';
import { addUserPayment,getUserPayment } from './controller/libraryPayment.controller.js';
import { registerAdmin } from './controller/adminRegister.controller.js';
import { loginAdmin } from './controller/adminLogin.controller.js';
import { logoutAdmin } from './controller/adminLogout.controller.js';
import { getUsers, blockUser, unblockUser, removeUser } from './controller/library.controller.js';
import { connectDB } from './db/connect.db.js';
import verifyUserToken from './middleware/verifyUserToken.js';
import verifyAdminToken from './middleware/verifyAdminToken.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const allowedOrigins = [
    'https://the-officer-s-library.vercel.app', // Frontend deployed on Vercel
    'http://localhost:3000' // Local development (if needed)
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(urlencoded({extended:false}));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Welcome to the server of The officer's Library");
})

// Admin protected routes for managing users

app.post('/admin/register',registerAdmin);
app.post('/admin/login',loginAdmin);
app.post('/admin/logout',logoutAdmin);
app.get('/admin/users', verifyAdminToken,getUsers);
app.post('/admin/payment',addUserPayment);
app.get('/admin/getpayment/:id',getUserPayment);
app.put('/admin/block/:id',verifyAdminToken,blockUser);
app.put('/admin/unblock/:id',verifyAdminToken,unblockUser);
app.delete('/admin/delete/:id',verifyAdminToken,removeUser);

// routes for student details

app.post('/user/register',registerUser);
app.post('/user/login',loginUser);
app.post('/user/logout', logoutUser);
app.post('/user/add',saveDetail);
app.get('/user/view',getDetails);
app.post('/user/payment',addPayment);
app.get('/user/getpayment/:id',getPayments);
app.delete('/user/delete/:id',remove);
app.get('/user/countStudentsByTimeSlot',countStudentsByTimeSlot);

app.listen(process.env.PORT,(err)=>{
    if(err) throw err;
    console.log("Server created at port 5000");
})

connectDB();