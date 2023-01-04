import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {CommonService} from "../../service/common.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  componentName = '';
  currentUser = null;
  constructor(public commonService:CommonService,private authService:UserService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
  }
  logout(){
    this.authService.logout();
  }
}
