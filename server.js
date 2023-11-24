import express from "express";
import router from "./router.js";
import connect_db from "./connection.js";
import dotenv from "dotenv";

dotenv.config()
const app = express();

app.use(express.json())
app.use(express.static("./template"))
app.use("/",router)






connect_db().then(()=>{
    app.listen(process.env.PORT,(error)=>{
        if(error){
            console.log(error);
        }
        console.log("Server Start");
    })
})
.catch((error)=>{
    console.log(error);
})