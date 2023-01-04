import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css'],
})
export class PincodeComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  pincodeForm = new FormGroup({
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]{6}$'),
    ]),
    city_id: new FormControl('', [Validators.required]),
    is_delivery_allowed: new FormControl('', [Validators.required]),
    state_id: new FormControl('', [Validators.required]),
  });
  UpdateForm = new FormGroup({
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]{6}$'),
    ]),
    city_id: new FormControl(),
    is_delivery_allowed: new FormControl('', [Validators.required]),
    state_id: new FormControl(),
  });
  constructor(
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.isAllowed = [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 },
    ];
  }
  isAllowed = [];
  msg = '';
  pincodeData: any;
  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  states = [];
  cities = [];
  selectedData = {
    id: null,
    pincode: null,
    is_delivery_allowed: null,
  };
  selectedCity = {
    id: null,
    name: null,
    state: null,
    state_id: null,
  };
  selectedState = {
    id: null,
    name: null,
    country_id: null,
  };
  selectedisAllowed = {
    label: null,
    value: null,
  };
  ngOnInit(): void {
    this.showData();
    this.commonService.loader(true);
    this.commonService.apiCall('get', '/api/system/getState').subscribe(
      (data) => {
        this.states = data['data']['data'];
        this.commonService.loader(false);
      },
      (error) => {
        this.commonService.loader(false);
        console.log(error);
        this.commonService.flashMessage('error', 'Error', 'No Data Available');
      }
    );
  }

  getValue(data) {
    return data == 1;
  }

  onChangeState(event) {
    console.log(event);
    this.cities = null;
    if (event.value != null) {
      this.commonService.loader(true);
      this.commonService
        .apiCall('get', `/api/system/getCity?state_id=${event.value.id}`)
        .subscribe(
          (data) => {
            this.cities = data['data']['data'];
            this.commonService.loader(false);
          },
          (error) => {
            this.commonService.loader(false);
            this.commonService.flashMessage(
              'error',
              'Error',
              'No Data Available'
            );
          }
        );
    } else {
      this.commonService.loader(true);
      this.commonService
        .apiCall('get', `/api/system/getCity?state_id=${event.state_id}`)
        .subscribe(
          (data) => {
            this.cities = data['data']['data'];
            this.selectedCity = this.cities.find((e) => e['id'] == event.id);
            this.commonService.loader(false);
          },
          (error) => {
            this.commonService.loader(false);
            this.commonService.flashMessage(
              'error',
              'Error',
              'No Data Available'
            );
          }
        );
    }
  }

  showData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/pincodes/getPincodes?pageNo=${this.currentPage}&limit=${this.tableSize}`
      )
      .subscribe(
        (data) => {
          this.pincodeData = data['data']['data'];
          this.totalCount = data['data']['count'];
          this.commonService.loader(false);
        },
        (error) => {
          console.log(error);
          this.commonService.loader(false);
          this.commonService.flashMessage(
            'error',
            'Error',
            'No Data Available'
          );
        }
      );
  }

  delete(id: number) {
    this.commonService.flashMessage(
      'error',
      'Error',
      'Delete Facility Coming Soon'
    );
  }

  addPincode() {
    if (
      this.credentials.pincode != '' &&
      this.credentials.city_id != '' &&
      this.credentials.is_delivery_allowed != '' &&
      this.credentials.pincode != null &&
      this.credentials.city_id != null &&
      this.credentials.is_delivery_allowed != null
    ) {
      this.credentials.city_id = this.credentials.city_id.id;
      this.credentials.is_delivery_allowed =
        this.credentials.is_delivery_allowed.value;
      this.commonService.loader(true);
      this.commonService
        .apiCall(
          'post',
          '/api/v1/admin/pincodes/createPincode',
          this.credentials
        )
        .subscribe(
          (response) => {
            if (response['success']) {
              this.modalRef.hide();
              this.commonService.loader(false);
              this.showData();
              this.commonService.flashMessage(
                'success',
                'Success',
                'Pincode Added Successfully'
              );
            } else {
              this.commonService.flashMessage(
                'error',
                'Error',
                response['message']
              );
              this.commonService.loader(false);
            }
          },
          (error) => {
            console.log(error);
            this.commonService.loader(false);
            let keys = Object.keys(error.data);
            for (let eachKey of keys) {
              for (let eachMsg of error.data[eachKey]) {
                this.commonService.flashMessage('error', 'Error', eachMsg);
              }
            }
          }
        );
    } else {
      this.commonService.flashMessage('error', 'Error', 'Fields Are Empty!!!');
    }
  }

  update(id) {
    console.log(this.UpdateForm);
    this.UpdateForm.value.city_id = this.UpdateForm.value.city_id.id;
    this.UpdateForm.value.is_delivery_allowed =
      this.UpdateForm.value.is_delivery_allowed.value;

    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'post',
        `/api/v1/admin/pincodes/updatePincode/${id}`,
        this.UpdateForm.value
      )
      .subscribe(
        (response) => {
          if (response['success']) {
            this.modalRef.hide();
            this.commonService.loader(false);
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'Pincode Updated Successfully'
            );
          } else {
            this.commonService.flashMessage(
              'error',
              'Error',
              response['message']
            );
            this.commonService.loader(false);
          }
        },
        (error) => {
          console.log(error);
          this.commonService.loader(false);
          let keys = Object.keys(error.data);
          for (let eachKey of keys) {
            for (let eachMsg of error.data[eachKey]) {
              this.commonService.flashMessage('error', 'Error', eachMsg);
            }
          }
        }
      );
  }
  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Pincode Management'),
      0
    );
  }
  selectData(post) {
    console.log(post);
    this.selectedData.id = post.id;
    this.selectedData.pincode = post.pincode;
    this.selectedCity.id = post.city.id;
    this.selectedCity.name = post.city.name;
    this.selectedCity.state_id = post.city.state_id;
    this.selectedCity.state = post.city.state;
    this.selectedState.name = post.city.state.name;
    this.selectedState.id = post.city.state.id;
    this.selectedState.country_id = post.city.state.country_id;
    this.selectedisAllowed = this.isAllowed.find(
      (e) => e['value'] == post.is_delivery_allowed
    );
    this.onChangeState(post.city);
  }
  onTableDataChange(event) {
    this.currentPage = event - 1;
    this.showData();
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.currentPage = 0;
    this.showData();
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  onChangeIsDeliverable(event, id) {
  
    let data = {
      is_delivery_allowed: event?.checked,
    };
    console.log(event.checked + id);

    console.log(event);
    this.commonService
      .apiCall('post', `/api/v1/admin/pincodes/updatePincode/${id}`, data)

      .subscribe(
        (response) => {
          if (response['success']) {
            // this.modalRef.hide();
            this.commonService.loader(false);
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'Dilevery Status Updated Successfully'
            );
          } else {
            this.commonService.flashMessage(
              'error',
              'Error',
              response['message']
            );
            this.commonService.loader(false);
          }
        },
        (error) => {
          console.log(error);
          this.commonService.loader(false);
          let keys = Object.keys(error.data);
          for (let eachKey of keys) {
            for (let eachMsg of error.data[eachKey]) {
              this.commonService.flashMessage('error', 'Error', eachMsg);
            }
          }
        }
      );

    console.log(data);
  }

  // reset() {
  //   this.pincodeForm.reset();
  //   this.msg = '';
  //   this.cities = null;
  //   this.showData();
  // }
}
