import mongoose from "mongoose";

const StudentSchema =new mongoose.Schema({
    seatno:{
        type:Number,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    fathername:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    mobile:{
        type:Number,
        required: true,
    },
    time:{
        type:String,
        required: true,
    },
    doj:{
        type:Date,
        required: true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }]
},{timestamps:true})

export const Student = mongoose.model("Student",StudentSchema);

