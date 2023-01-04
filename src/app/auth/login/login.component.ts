import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  msg = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  credentials: any = {};

  constructor(private commonService: CommonService) {}

  ngOnInit() {}

  onSubmit() {
    if (
      this.credentials.email != '' &&
      this.credentials.password != '' &&
      this.credentials.email != null &&
      this.credentials.password != null
    ) {
      this.commonService.loader(true);
      this.commonService
        .apiCall('post', '/api/auth/adminLogin', this.credentials)
        .subscribe(
          (response: any) => {
            if (response.success == false) {
              this.msg = response.message;
            }
            this.commonService.loader(false);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem(
              'userData',
              JSON.stringify(response.data.userData)
            );
            window.location.href = '/';
          },
          (error) => {
            this.msg =
              'Incorrect password. Try again or click Forgot Password to reset.';
            this.commonService.loader(false);
          }
        );
    } else {
      this.msg = 'Fields Are Empty';
    }
  }
}
