import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { registerUser } from './controller/libraryRegister.controller.js';
import { loginUser } from './controller/libraryLogin.controller.js';
import { logoutUser } from './controller/libraryLogout.controller.js';
import { getDetails, remove, saveDetail, countStudentsByTimeSlot, getPendingRequests, acceptRequest, rejectRequest } from './controller/student.controller.js';
import { addPayment,getPayments } from './controller/studentPayment.cotroller.js';
import { addUserPayment,getUserPayment } from './controller/libraryPayment.controller.js';
import { registerAdmin } from './controller/adminRegister.controller.js';
import { loginAdmin } from './controller/adminLogin.controller.js';
import { logoutAdmin } from './controller/adminLogout.controller.js';
import { getUsers, blockUser, unblockUser, removeUser } from './controller/library.controller.js';
import { requestAdmission } from './controller/requestAdmission.js';
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
app.post('/admin/payment',verifyAdminToken,addUserPayment);
app.get('/admin/getpayment/:id',verifyAdminToken,getUserPayment);
app.put('/admin/block/:id',verifyAdminToken,blockUser);
app.put('/admin/unblock/:id',verifyAdminToken,unblockUser);
app.delete('/admin/delete/:id',verifyAdminToken,removeUser);

// User routes for student details

app.post('/user/register',registerUser);
app.post('/user/login',loginUser);
app.post('/user/logout', logoutUser);
app.post('/user/add',verifyUserToken,saveDetail);
app.get('/user/view',verifyUserToken,getDetails);
app.post('/user/payment',verifyUserToken,addPayment);
app.get('/user/getpayment/:id',verifyUserToken,getPayments);
app.delete('/user/delete/:id',verifyUserToken,remove);
app.get('/user/countStudentsByTimeSlot',verifyUserToken,countStudentsByTimeSlot);
app.get('/user/admissionrequests', verifyUserToken, getPendingRequests);
app.put('/user/requests/accept/:id', verifyUserToken, acceptRequest);
app.delete('/user/requests/reject/:id', verifyUserToken, rejectRequest);


// Student routes for admission request

app.post('/student/requestadmission', requestAdmission);

//Server Creation

app.listen(process.env.PORT || 5000,(err)=>{
    if(err) throw err;
    console.log("Server created at port 5000");
})

connectDB();