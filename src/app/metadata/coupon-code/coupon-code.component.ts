import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.css'],
})
export class CouponCodeComponent implements OnInit, AfterViewInit {
  showModal: boolean;
  imagesrc: null;
  modalRef: BsModalRef;
  couponForm = new FormGroup({
    coupon_name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    max_discount: new FormControl('', [Validators.required]),
    start_date: new FormControl('', []),
    end_date: new FormControl('', [Validators.required]),
    min_order_amount: new FormControl('', [Validators.required]),
    is_active: new FormControl('', [Validators.required]),
  });
  updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    coupon_name: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    max_discount: new FormControl('', [Validators.required]),
    start_date: new FormControl('', []),
    end_date: new FormControl('', [Validators.required]),
    min_order_amount: new FormControl('', [Validators.required]),
    is_active: new FormControl('', [Validators.required]),
  });
  msg = '';
  closeResult: string;
  modalOptions: NgbModalOptions;
  is_active = false;
  coupon = [];
  constructor(
    public commonService: CommonService,
    private modalService: BsModalService,
    private newmodalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
    this.yesorno = [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 },
    ];
  }

  yesorno = [];

  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  selectedData = {
    id: null,
    coupon_name: null,
    amount: null,
    description: null,
    max_discount: null,
    start_date: null,
    end_date: null,
    min_order_amount: null,
    is_active: null,
  };

  selectedIsActive = [
    { label: '', value: '' },
    { label: '', value: '' },
  ];

  ngOnInit(): void {
    this.showData();
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Coupon Code Management'),
      0
    );
  }

  showData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/product/getCouponCode?limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.coupon = data['data']['data'];
            console.log(this.coupon);
            this.commonService.loader(false);
          } else {
            this.commonService.flashMessage('error', 'Error', data['message']);
            this.commonService.loader(false);
          }
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

  // onChangeIsActive(event) {
  //   console.log(event);
  //   if (event.value) {
  //     this.is_active = true;
  //   } else {
  //     this.is_active = false;
  //   }
  // }

  addCoupon() {
    console.log(this.couponForm.value);
    if (this.couponForm.valid) {
      const formData = new FormData();
      formData.append('coupon_name', this.couponForm.value.coupon_name);
      formData.append('amount', this.couponForm.value.amount);
      formData.append('description', this.couponForm.value.description);
      formData.append('max_discount', this.couponForm.value.max_discount);
      formData.append('start_date', this.couponForm.value.start_date);
      formData.append('end_date', this.couponForm.value.end_date);
      formData.append(
        'min_order_amount',
        this.couponForm.value.min_order_amount
      );
      formData.append('is_active', this.couponForm.value.is_active);

      this.commonService.loader(true);
      this.commonService
        .apiCall('post', '/api/v1/admin/product/createCouponCode', formData)
        .subscribe(
          (response) => {
            if (response['success']) {
              this.modalRef.hide();
              this.commonService.loader(false);
              this.showData();
              this.couponForm.reset();
              this.commonService.flashMessage(
                'success',
                'Success',
                'Coupon Added Successfully'
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
      this.commonService.flashMessage(
        'error',
        'Error',
        'Please Fill All Required Fields'
      );
      let erroFields = [];
      console.log(erroFields);
      let keyMsgMapping = {
        coupon_name: 'Coupon name is required',
        amount: 'Price is required',
        description: 'description is required',
        max_discount: 'max_discount is required',
        start_date: 'start_date is required',
        end_date: 'end_date is required',
        min_order_amount: 'min_order_amount is required',
        is_active: 'Please select is sale or not',
      };
      console.log(keyMsgMapping);
      let keys = Object.keys(this.couponForm.controls);

      for (let eachKey of keys) {
        if (this.couponForm.controls[eachKey]['errors']) {
          console.log(this.couponForm.controls[eachKey]['errors'], eachKey);
          this.commonService.flashMessage(
            'error',
            'Error',
            keyMsgMapping[eachKey]
          );
        }
      }
    }
  }

  selectData(post) {
    console.log(post);

    this.selectedIsActive = this.yesorno.find(
      (e) => e['value'] == post.is_on_sale
    );
    // this.updateForm.patchValue({
    //   id: post.id,
    //   coupon_name: post.coupon_name,
    //   amount: post.amount,
    //   description: post.description,
    //   max_discount: post.max_discount,
    //   start_date: post.start_date,
    //   end_date: post.end_date,
    //   min_order_amount: post.min_order_amount,
    //   is_active: post.is_active,
    // });
    this.selectedData.id = post.id;
    this.selectedData.coupon_name = post.coupon_name;
    this.selectedData.amount = post.amount;
    this.selectedData.description = post.description;
    this.selectedData.max_discount = post.max_discount;
    this.selectedData.start_date = post.start_date;
    this.selectedData.end_date = post.end_date;
    this.selectedData.min_order_amount = post.min_order_amount;
    this.selectedData.is_active = post.is_active;
  }

  update(id) {
    this.commonService.loader(true);
    console.log(this.updateForm.value);

    const formData = new FormData();

    formData.append('coupon_name', this.updateForm.value.coupon_name);
    formData.append('amount', this.updateForm.value.amount);
    formData.append('description', this.updateForm.value.description);
    formData.append('max_discount', this.updateForm.value.max_discount);
    formData.append('start_date', this.updateForm.value.start_date);
    formData.append('end_date', this.updateForm.value.end_date);
    formData.append('min_order_amount', this.updateForm.value.min_order_amount);
    formData.append('is_active', this.updateForm.value.is_active.value);

    this.commonService
      .apiCall('post', `/api/v1/admin/product/updateCouponCode/${id}`, formData)
      .subscribe(
        (response) => {
          // this.showImageSelectionInput = false;
          // this.showDescriptionImageSelectionInput = false;
          if (response['success']) {
            this.modalRef.hide();
            this.commonService.loader(false);
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'Coupon Updated Successfully'
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

  deleteCoupon(id: number) {
    this.commonService.loader(true);
    this.commonService
      .apiCall('delete', `/api/v1/admin/product/deleteCouponCode/${id}`)
      .subscribe(
        (response) => {
          if (response['success']) {
            this.showData();
            this.commonService.loader(false);
            this.commonService.flashMessage(
              'success',
              'Success',
              'Coupon Deleted Successfully'
            );
          } else {
            console.log(response);
            this.commonService.loader(false);
          }
        },
        (error) => {
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
  getValue(data) {
    return data == 1;
  }

  onChangeIsActive(event, id) {
    // FormData.('is_active', this.updateForm.value.is_active);
    let data = {
      is_active: event?.checked,
    };
    console.log(event.checked + id);

    console.log(event);
    this.commonService
      .apiCall('post', `/api/v1/admin/product/updateCouponCode/${id}`, data)
      .subscribe(
        (response) => {
          if (response['success']) {
            // this.modalRef.hide();
            this.commonService.loader(false);
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'slide Updated Successfully'
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

    if (event.value) {
      this.is_active = true;
    } else {
      this.is_active = false;
    }
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

  show(post) {
    this.showModal = true; // Show-Hide Modal Check
    this.imagesrc = post;
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
  open(content) {
    this.newmodalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
