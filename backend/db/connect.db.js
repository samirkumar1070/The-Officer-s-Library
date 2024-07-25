import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://gauravsinha1070:ro4BbjVJu0uvG7VV@cluster0.zw9cd6d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
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