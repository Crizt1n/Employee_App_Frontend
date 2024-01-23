import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string=""
  password:string=""

  constructor(private api:AdminapiService, private router:Router){}

  login(){
    if(!this.email || !this.password){
      Swal.fire({
        title: "Oops..!",
        text: "Please fill the form completely",
        icon: "info"
      });
    }
    else{
  

      this.api.authorization().subscribe({
        next:(res:any)=>{
          const {email,password} = res
          if(email === this.email && password === this.password){
            Swal.fire({
              icon: "success",
              title: "Wow..!",
              text: "Login Successfull"
              
            });
            //save admin and paswword
            this.api.updatedata({d:true})
            
            localStorage.setItem("name",res.name)
            localStorage.setItem("password",res.password)

            

            //NAVIGATE
             this.router.navigateByUrl('dashboard')
          }
          else{
            Swal.fire({
              icon: "error",
              title: "Oops..!",
              text: "Invalid email id or password"
              
            });
          }

        },
        error:(res:any)=>{
          console.log(res);
          
        }
      })
    }
  }

}
