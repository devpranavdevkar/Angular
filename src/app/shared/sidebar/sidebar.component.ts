import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SidebarService } from '../../service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  title = 'admin-panel-template';
  isCollapsed: boolean = false;
  isButtonVisible: boolean = true;
  public isAdmin = false;
  public isVendor = false;
  currentUser = null;
  constructor(
    private sidebarService: SidebarService,
    private authService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUserInfo();
    this.check();
  }

  check() {
    for (let index1 in this.currentUser.roles) {
      if (this.currentUser.roles[index1]['name'] == 'Admin') {
        this.isAdmin = true;
      } else if (this.currentUser.roles[index1]['name'] == 'Vendor') {
        this.isVendor = true;
      }
    }
  }

  sidebar() {
    return this.sidebarService.isSidebarOpen;
  }

  // @ts-ignore
  changeStyle(event) {
    if (this.sidebarService.isSidebarOpen == '' && event.type == 'mouseover') {
      this.sidebarService.isSidebarOpen = 'open';
    }
    if (
      this.sidebarService.isSidebarOpen == 'open' &&
      event.type == 'mouseout'
    ) {
      this.sidebarService.isSidebarOpen = '';
    }
  }

  onClickOpen() {
    this.sidebarService.isSidebarOpen =
      this.sidebarService.isSidebarOpen == '' ? 'open' : '';
  }

  onItemClick() {
    if (this.sidebarService.isSidebarOpen == '') {
      this.sidebarService.isSidebarOpen = 'open';
    }
  }
}
