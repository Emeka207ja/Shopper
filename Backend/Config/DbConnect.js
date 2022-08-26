import mongoose from "mongoose";

export const connectDb = async () => {
   try {
     const conn = await  mongoose.connect(process.env.DATABASE_URL,{
                useUnifiedTopology: true,
                useNewUrlParser: true,
                // useCreateIndex: true
                
     })
       console.log(`connected on ${conn.connection.host}`)
   } catch (error) {
       console.error(error.message)
       process.exit(1)
   }
}