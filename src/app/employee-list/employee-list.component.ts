import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeeModel } from '../services/employee.model';
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {  //OnInit is an interface to implement ngOnInit function

  allEmployee:employeeModel[]=[]

  searchKey:string=""

  //for pagination
  p: number = 1;

  constructor(private api:AdminapiService){}

  //lifecycle hook - call just after the component is created and constructor is called
  ngOnInit(): void {
      this.allEmployeeDetails()
  }

  allEmployeeDetails(){
    this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{
        
        this.allEmployee = res
        console.log(this.allEmployee);
        
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  removeEmployee(id:any){
    this.api.deteleEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Done..!",
          text: `Data deleted Successfully`
         
        });
        this.allEmployeeDetails()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  sortId(){
    console.log("Sorting by ID");
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
    
  }

  sortName(){
   
    this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }


  generatePdf(){
    //create an object for jsPDF
    const pdf = new jsPDF()

    let head = [['Id','Employee Name', 'Email', 'Status']]

    let body :any= []

    this.allEmployee.forEach((item:any)=>{
      body.push([item.id , item.name , item.email, item.status ])
    })

    //font Size
    pdf.setFontSize(16)

    //title
    pdf.text('Employee Details Report',20,5)

    //table
    autoTable(pdf,{head,body})

    //to open in a new tab
    pdf.output('dataurlnewwindow')

    //to open in another page 
    pdf.save('Employee.pdf')


  }


}
