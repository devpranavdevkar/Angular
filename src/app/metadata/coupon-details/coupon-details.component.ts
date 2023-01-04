import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { CommonService } from 'src/app/service/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.css'],
})
export class CouponDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('cityPriceModal') cityPriceModal;
  showModal: boolean;
  imagesrc: null;
  modalRef: BsModalRef;
  msg = '';
  currentProductVariable: any = {};
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

  is_on_Sale = false;
  coupondetails: any;
  constructor(
    public commonService: CommonService,
    private modalService: BsModalService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeid = this.activeRoute.snapshot.params.id;
  }

  selectedSize = {};
  selectedSale = [
    { label: '', value: '' },
    { label: '', value: '' },
  ];
  sale = [];
  size = [];
  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;

  selectedData = {
    id: null,
    product_id: null,
    image_url: null,
  };
  productdetails: any;
  data: any;
  selectedFile: File;
  subcategory: any;
  mainCategory = null;
  category: any;
  selectedProduct: any;
  categoryId = null;
  activeid = null;
  couponList = [];
  showImageSelectionInput = false;
  ngOnInit(): void {
    this.showData();
    // this.product();

    this.getData();
  }
  getData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/product/getCouponCode?limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.couponList = data['data'];
            console.log(this.couponList);
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

  showData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        '/api/v1/admin/product/getCouponCodeById/' + this.activeid
      )
      .subscribe(
        (data) => {
          this.commonService.loader(false);
          if (data['success']) {
            this.coupondetails = data['data']['value'];
            console.log(this.productdetails);
          } else {
            this.commonService.flashMessage('error', 'Error', data['message']);
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
  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Coupon Code Management'),
      0
    );
  }

  hideModal() {
    this.showImageSelectionInput = false;
    this.modalRef.hide();
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
}
