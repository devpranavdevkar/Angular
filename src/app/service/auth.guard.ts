import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {CommonService} from './common.service';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: UserService,
    private  _commonService: CommonService
  ) { }

  canActivate(): boolean {
    if (this._authService.isLoggedIn()){
      return true;
    }else {
      this._commonService.navigateTo('auth');
      return false;
    }
  }
}
