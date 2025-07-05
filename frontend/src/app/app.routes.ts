import { Routes } from '@angular/router';
import { ManageemployeeComponent } from './components/employeemanage/manageemployee/manageemployee.component';
import { EmployeeformComponent } from './components/employeeform/employeeform.component';

export const routes: Routes = [
  {
    path:"",component:ManageemployeeComponent,
  },
  {
    path:"form",component:EmployeeformComponent,
  },
  {
    path:"form/:id",component:EmployeeformComponent,
  }
];
