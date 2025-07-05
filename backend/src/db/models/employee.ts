import mongoose,{Schema,Document,Model} from "mongoose";

interface IEmployee extends Document{
    name:string,
    salary:number,
    email:string,
    dob:string,
    picture:string,
    payroll:string
}

const EmployeeSchema:Schema = new Schema({
    name:{type:String,require:true},
    salary:{type:Number},
    email:{type:String},
    dob:{type:String},
    picture:{type:String},
    payroll:{type:String}
})

const EmployeeModel:Model<IEmployee> = mongoose.model<IEmployee>("Employees",EmployeeSchema);

export default EmployeeModel;