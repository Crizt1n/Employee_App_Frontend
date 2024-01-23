import { Component } from '@angular/core';
import { employeeModel } from '../services/employee.model';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  //variable to store the value from the input box which have the same structure of employeeModel
  employee:employeeModel={}
  constructor(private api:AdminapiService, private router:Router){}

  cancelEmployee(){
    this.employee={}
  }

  addEmployee(){
    console.log(this.employee);

    if(!this.employee.name || !this.employee.id || !this.employee.email || !this.employee.status){
      Swal.fire({
        title: "Oops..!",
        text: "Please Fill the form Completeley",
        icon: "info"
      })
    }

    else{  
        this.api.addEmployeeApi(this.employee).subscribe({
          next:(res:employeeModel)=>{
            console.log(res);
            Swal.fire({
              icon: "error",
              title: "Oops...!",
              text: "failed"        
            });
           
        
            this.employee={}
            this.router.navigateByUrl('employees')


            
          }
          ,

          error:(err:any)=>{
            console.log(err);
           
            Swal.fire({
              icon: "success",
              title: "Wow",
              text: `Data added Successfully`
             
            });
          }
        })
    }
    
  }

}
