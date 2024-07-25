import mongoose from "mongoose";

const MemberDetailsSchema =new mongoose.Schema({
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
    }
},{timestamps:true})

MemberDetailsSchema.index({ seatno: 1, time: 1 }, { unique: true }); //Compound unique index to ensure that two students do not get the same seat number in the same time slot, but allow the same seat number in different time slots

export const Detail = mongoose.model("Detail",MemberDetailsSchema);

