import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public componentName = 'Dashboard';
  constructor(
    private http: HttpClient,
    private router: Router,
    private iziToast: Ng2IzitoastService,
    private spinner: NgxSpinnerService
  ) {}

  baseUrl = 'https://intellicoolkidz.shreekakajimasale.com';

  // @ts-ignore
  apiCall(type: string, url: string, body = {}, header = {}) {
    if (environment.production == true) {
    
      url = 'https://intellicoolkidz.shreekakajimasale.com' + url;
    } else {
      url = 'https://intellicoolkidz.shreekakajimasale.com' + url;
    }

    //
    switch (type.toLowerCase()) {
      case 'get': {
        return this.http.get(url, header).pipe(
          map((data) => {
            return data;
          })
        );
      }
      case 'post': {
        return this.http.post(url, body, header).pipe(
          map((data) => {
            return data;
          })
        );
      }
      case 'put': {
        return this.http.put(url, body);
      }
      case 'delete': {
        return this.http.delete(url);
      }
    }
  }

  navigateTo(url: any) {
    this.router.navigateByUrl(url);
  }

  flashMessage(type: any, title: any, message: any, timeout = 5000): void {
    switch (type.toLowerCase()) {
      case 'success':
        this.iziToast.show({
          title: title,
          message: message,
          position: 'topCenter',
          color: 'green',
          progressBar: false,
          timeout: timeout,
        });
        break;
      case 'info':
        this.iziToast.show({
          title: title,
          message: message,
          position: 'topCenter',
          color: 'blue',
          progressBar: false,
          timeout: timeout,
        });
        break;
      case 'warning':
        this.iziToast.show({
          title: title,
          message: message,
          position: 'topCenter',
          color: 'orange',
          progressBar: false,
          timeout: timeout,
        });
        break;
      case 'error':
        this.iziToast.show({
          title: title,
          message: message,
          position: 'topCenter',
          color: 'red',
          progressBar: false,
          timeout: timeout,
        });
        break;
    }
  }

  loader(flag: any) {
    if (flag) {
      this.spinner.show();
    } else {
      this.spinner.hide();
    }
  }

  setComponentname(name: any) {
    this.componentName = name;
  }
}
