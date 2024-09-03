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
    library:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Library',
        required: true
    },
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StudentPayment'
    }],
    status: { 
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    }
},{timestamps:true})

export const Student = mongoose.model("Student",StudentSchema);

