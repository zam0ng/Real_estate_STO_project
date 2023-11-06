import * as dotenv from "dotenv";
dotenv.config();
import express , {Express, Request, Response} from "express";

import {sequelize} from "./models/"

import adminRouter from "./routers/admin/adminRoutes";

const app:Express = express();
app.use(express.urlencoded({ extended: false }));


sequelize
.sync({force : true})
.then(()=>{
    console.log("database connect");
})
.catch((err)=>{
    console.log("err",err);
})

app.use("/admin",adminRouter);

app.listen(8080,()=>{
    console.log("server on");
})