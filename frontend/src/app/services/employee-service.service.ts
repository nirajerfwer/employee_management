import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  backendurl = "http://localhost:3000/";

  constructor(private http:HttpClient) {

   }

   createemployee(bodydata:any,picture:any){
     console.log("bodydata",bodydata);
    const myform= new FormData();
    myform.append("name",bodydata.name.value);
    myform.append("salary",bodydata.salary.value);
    myform.append("email",bodydata.email.value);
    myform.append("dob",bodydata.dob.value);
    myform.append("payroll",bodydata.payroll.value);
    myform.append("picture",picture);
    return this.http.post(this.backendurl+"employee",myform);
   }

   getEmployeeById(id:any){
      return this.http.get(this.backendurl+"employee"+"/"+id);
   }
   getEmployees(){
    return this.http.get(this.backendurl+"employee");
   }

   updateEmployee(id:string,bodydata:any,picture:any){
    console.log("upload bodydata",bodydata);
        const myform= new FormData();
    myform.append("name",bodydata.name.value);
    myform.append("salary",bodydata.salary.value);
    myform.append("email",bodydata.email.value);
    myform.append("dob",bodydata.dob.value);
    myform.append("payroll",bodydata.payroll.value);

    if(picture){
      myform.append("picture",picture);
    }
    return this.http.put(this.backendurl+"employee"+"/"+id,myform);
   }

   deleteEmployee(id:string){
       return this.http.delete(this.backendurl+"employee"+"/"+id);
   }
}
