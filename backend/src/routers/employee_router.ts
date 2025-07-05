import { Request,Response } from "express";
import { createemployee, deleteemployee, getemployees, getemployeesbyId, updateemployee } from "../handler/employee_handler";
const multer = require("multer");
const express = require("express");
const ERounter = express.Router();
import path from 'path';
import fs from 'fs';

const uploadDir = path.join('..\\frontend\\src\\assets','pictures');
let currentuploadimae = "";

if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
      destination:(req:any,file:any,cb:any)=>{
            cb(null,uploadDir);
      },
      filename:(req:any,file:any,cb:any)=>{
            currentuploadimae = Date.now() + "_" + file.originalname;
            cb(null,currentuploadimae);
      }
});

const mymulter = multer({storage});


ERounter.get("",mymulter.none(),(req:Request,res:Response)=>{
      getemployees().then((data:any)=>{
        res.status(200).send({message:"data found",employees:data})
      }).catch((error:any)=>{
         res.send({message:"error while getting employee data",error})
      })
})
ERounter.get("/:id",mymulter.none(),(req:Request,res:Response)=>{
      let id = req.params.id;
      getemployeesbyId(id).then((data:any)=>{
        res.status(200).send({message:"data found",employees:data})
      }).catch((error:any)=>{
         res.send({message:"error while getting employee data",error})
      })
})
ERounter.post("",mymulter.single('picture'),(req:Request,res:Response)=>{
      let bodydata = req.body;
      bodydata.picture = `${currentuploadimae}`;
      console.log("create employee bodydata",bodydata);
      createemployee(bodydata).then((data)=>{
            res.status(200).send({message:"employee created",data:data});
      }).catch((error)=>{
            console.log("erorr while creating",error);
           res.status(500).send({message:"error while creating employee"});
      })
})
ERounter.put("/:id",mymulter.single('picture'),(req:Request,res:Response)=>{
      let id = req.params.id;
      let bodydata = req.body;
      bodydata.picture = `${currentuploadimae}`;
      console.log("create employee bodydata",bodydata);
      updateemployee(id,bodydata).then((data)=>{
           res.status(200).send({message:"employee updated",data:data});
      }).catch((error)=>{
          res.status(500).send({message:"error while updating employee"});
      })
})
ERounter.delete("/:id",mymulter.none(),(req:Request,res:Response)=>{
      let id = req.params.id;
      deleteemployee(id).then((data)=>{
        res.status(200).send({message:"employee deleted",data:data});
      }).catch((error)=>{
        res.status(500).send({message:"error while deleting employee"});
      })
})

export default ERounter;