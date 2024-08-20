import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    location: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
    },
    isActive: { 
        type: Boolean, 
        default: true
    },
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserPayment'
    }],
    refreshToken:{
        type: String
    }
},{timestamps:true});

UserSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

UserSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",UserSchema);