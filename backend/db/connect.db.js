import mongoose from "mongoose";

const connectDB = async ()=>{
    const mongodb_uri = process.env.MONGODB_URI;
    try {
        const connectionInstance = await mongoose.connect(`${mongodb_uri}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const host = connectionInstance.connection.host;
        console.log("DB connected!!",host);
    } catch (error) {
        console.log(error);
    }
}

export {connectDB};