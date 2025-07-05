import { AbstractControl,ValidationErrors } from "@angular/forms";

export function dateofbirthvalidator(minimumage:any){
  return (control:AbstractControl): ValidationErrors | null =>{
           const currentdate = new Date(control.value);
           const today = new Date();

           const age = today.getFullYear() - currentdate.getFullYear();
           const monthdiff = today.getMonth() - currentdate.getMonth();
           const daysdiff = today.getDate() - currentdate.getDate();

           const afterage = (monthdiff < 0 || (daysdiff < 0 && monthdiff === 0))? age - 1 : age;
          console.log(afterage);
           return afterage >= minimumage ? null : {minage:{requiredAge: minimumage,afterage}};
  }
}
