import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {

    try {
        console.log(`${process.env.MONGODB_URI} is the URI`)
        const connectionInstnce = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Mongo db connected !! DB Host : ${connectionInstnce.connection.host}`)

    } catch (error) {
        console.log(`mongo db connection Failed ${error}`)
        process.exit(1)
    }
}

export default connectDB