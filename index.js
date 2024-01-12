const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors')

const db = require("./db/connect")

const PORT = process.env.PORT || 1410;

app.use(cors())

app.use(express.json({ limit: '10mb' }));

const path = require("./routes/routes")

app.use("/api/v0",path);

const start = async ()=>{
    try{
        // await db.connect();
        console.log("Database connected successfully")
        app.listen(PORT, () =>{
            console.log(`Server is running at ${PORT}`);
        });
    } catch(error){
        console.log(error);
    } 
    // finally{
    //     await db.closeDb();
    // }
}


start() 