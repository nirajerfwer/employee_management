import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { dateofbirthvalidator } from '../../myvalidator/myvalidation';
import { EmployeeServiceService } from '../../services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employeeform',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employeeform.component.html',
  styleUrl: './employeeform.component.scss',
})
export class EmployeeformComponent implements OnInit {
  eform: FormGroup;
  submited = false;
  uploadefile = File || null;
  pictureerrormessage = '';
  pictureerror = false;
  isUpdate = false;
  currentid?: string | null;

  constructor(
    private formbuild: FormBuilder,
    private employeeService: EmployeeServiceService,
    private router:Router,
    private route: ActivatedRoute
  ) {
    this.eform = formbuild.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('([a-zA-Z0-9_.-]+)@(gmail+)([.])([a-zA-Z]+)'),
        ],
      ],
      dob: [null, [Validators.required, dateofbirthvalidator(16)]], // make age dif should be 16 years
      picture: [null, [Validators.required]],
      payroll: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.currentid = this.route.snapshot.paramMap.get('id');
    if (this.currentid) {
      this.isUpdate = true;
      this.updatetable(this.currentid);
      // for(let i=0;i<this.updateimage.length;i++){
      //   this.addimage();
      // }
    }
  }

  updatetable(id: any) {
    this.employeeService.getEmployeeById(id).subscribe((data: any) => {
      if (data) {
        console.log('update element of data', data);
        console.log('data found for id' + id);
        this.eform.patchValue(data.employees);
      }
    });
  }

  formsubmit() {
    this.submited = true;
    if (this.eform.valid) {
      console.log('form is valid');
      if (!this.isUpdate) {
        if(this.uploadefile == null){
           this.pictureerror = true;
           this.pictureerrormessage = "image is required";
        }
        this.employeeService
          .createemployee(this.eform.controls,this.uploadefile)
          .subscribe((data) => {
            console.log('employee created', data);
            // alert('Employee Created');
          });
      } else {
        this.employeeService
          .updateEmployee(this.currentid!, this.eform.controls,this.uploadefile)
          .subscribe((data) => {
            console.log('employee upload', data);
            // alert('employees updated');
          });
      }
      this.router.navigate(['/']);
      console.log(this.eform);
    } else {
      console.log('form invalid');
    }
  }

  pictureuploaded(event: any) {
    let picture = event.target.files[0];

    if (picture) {
      let maxpicturesize = 150 * 1024;
      let filetypes = ['image/jpg', 'image/png', 'image/jpeg'];
      this.uploadefile = picture;
      console.log(this.uploadefile);
      console.log(filetypes.includes(picture.type));
      console.log(picture.type);
      if (!filetypes.includes(picture.type)) {
        console.log('in picture type');
        this.pictureerrormessage = 'upload file type jpg or png or jpeg';
        this.pictureerror = true;
      }
      if (picture.size > maxpicturesize) {
        this.pictureerrormessage = 'upload picture size smaller then 150 kb';
        this.pictureerror = true;
      } else {
        this.pictureerror = false;
        this.eform.patchValue({
          picture: picture,
        });
      }
    }
  }

  get employeeformcontrols() {
    return this.eform.controls;
  }
}
