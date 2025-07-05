import { create } from "domain";
import EmployeeModel from "../db/models/employee"

export const getemployees = async() =>{
    const foundemployee = await EmployeeModel.find();
    return foundemployee;
}
export const getemployeesbyId = async(id:string) =>{
    const foundemployee = await EmployeeModel.findById(id);
    return foundemployee;
}
export const updateemployee = async(id:string,bodydata:any) =>{
    const foundemployee = await EmployeeModel.findByIdAndUpdate(id,bodydata);
    return foundemployee;
}
export const deleteemployee = async(id:string) =>{
    const foundemployee = await EmployeeModel.findByIdAndDelete(id);
    return foundemployee;
}
export const createemployee = async(bodydata:any) =>{
    console.log("while creating data check",bodydata);
    let employee = new EmployeeModel(bodydata);
    const createddata =  await employee.save();
    return createddata;
}