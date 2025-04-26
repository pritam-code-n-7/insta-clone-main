import mongoose from "mongoose"

export const dbConnect = async()=>{
    try {
        if(!process.env.MONGO_URI){
            throw new Error('No connection string found.')
        }

        await mongoose.connect(process.env.MONGO_URI , {
            dbName: process.env.DB_NAME
        })
        console.log("mongodb connected");
          
    } catch (error) {
        console.error(error);
        process.exit(1)
      }
}