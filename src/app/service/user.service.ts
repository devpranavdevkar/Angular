import { Injectable } from '@angular/core';
import {LocalstorageService} from "./localstorage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public router: Router) { }

  getToken(): string{
    return <string>localStorage.getItem('token');
  }
  isLoggedIn(): boolean{
    return localStorage.getItem('token')!==null;
  }

  getUserInfo(){
    let authToken = localStorage.getItem('userData');
    if(authToken !== null){
      let userDetails = JSON.parse(localStorage.getItem('userData'));
      return userDetails;
    }else{
      this.router.navigate(['/auth']);
    }
  }

  logout() {
      localStorage.clear();
      window.location.href="/auth"
  }
}
