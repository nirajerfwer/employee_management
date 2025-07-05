import ERounter from "./routers/employee_router";

const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()
const port = 3000

async function dbconnection(){
    await mongoose.connect("mongodb://localhost:27017",{dbName:"employee_db"});
}

dbconnection().then(()=>{
    console.log("db connected");
}).catch(()=>{
    console.log("error while connecting with db");
});
app.use(cors());
app.use("/employee",ERounter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))