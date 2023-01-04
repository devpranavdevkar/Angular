import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {CommonService} from './common.service';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private _authService: UserService,
    private  _commonService: CommonService
  ) { }

  canActivate(): boolean {
    if (this._authService.isLoggedIn()){
      this._commonService.navigateTo('dashboard');
      return true;
    }else {

      return false;
    }
  }
}
