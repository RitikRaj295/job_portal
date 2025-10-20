import mongoose from "mongoose";

const connectDb = async()=>{   
     try {
         await mongoose.connect(process.env.MONGO_URI);
         console.log('Database connnected sucessfully!');
     } catch (error) {
      console.error("Error while database connection!",error.message);
     }
}


export default connectDb;