import 'dotenv/config'
import connectDB from "./db/index.js";
import { app } from './app.js';



connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Mongo db connected !! DB Host : ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("Mongo db connection failed")
})