import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../../../services/employee-service.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

export interface EmployeeData{
  picture:string;
  name:string;
  salary:number;
  email:string;
  dob:string;
  payroll:string;
}

@Component({
  selector: 'app-manageemployee',
  imports: [[MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,RouterLink]],
  templateUrl: './manageemployee.component.html',
  styleUrl: './manageemployee.component.scss'
})
export class ManageemployeeComponent implements OnInit{
  displayedColumns: string[] = ['id','picture','name', 'salary', 'email', 'dob', 'payroll','action'];
  dataSource!: MatTableDataSource<EmployeeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  EmployeeData:any;

  constructor(private employeeService:EmployeeServiceService){
   this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(): void {
      this.initialload();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //test
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async initialload(){
     this.employeeService.getEmployees().subscribe((data)=>{
        this.EmployeeData = data;
        console.log("EmployeeDat",this.EmployeeData);
        this.dataSource.data = this.EmployeeData.employees;
     })
  }

  async DeleteBrand(id:string){
    console.log("delete id",id);
    this.employeeService.deleteEmployee(id).subscribe(()=>{
      console.log("employee deleted");
      alert("employee delted");
      this.initialload();
    });
  }

}
