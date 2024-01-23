import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'

export const authGuard: CanActivateFn = (route, state) => {
  const authStatus = inject(AuthService)
  const router = inject(Router)


  if(authStatus.islogged()){
    return true;
  }
  else{
    // You can redirect to login page or show some error message based on your requirement
    Swal.fire({
      title: "Oops..!",
      text: "Please Login",
      icon: "info"
    });
    router.navigateByUrl("")
    return true;
  }


};
