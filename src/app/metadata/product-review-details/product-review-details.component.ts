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
  selector: 'app-product-review-details',
  templateUrl: './product-review-details.component.html',
  styleUrls: ['./product-review-details.component.css'],
})
export class ProductReviewDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('cityPriceModal') cityPriceModal;
  showModal: boolean;
  imagesrc: null;
  modalRef: BsModalRef;
  msg = '';
  currentProductVariable: any = {};

  reviewdetails: any;
  constructor(
    public commonService: CommonService,
    private modalService: BsModalService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeid = this.activeRoute.snapshot.params.id;
  }

  selectedSize = {};

  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;

  selectedData = {
    id: null,
    review_id: null,
    image_url: null,
  };
  reviewdetail: any;
  data: any;
  selectedFile: File;
  subcategory: any;
  mainCategory = null;
  category: any;
  selectedProduct: any;
  categoryId = null;
  activeid = null;
  reviewList = [];
  showImageSelectionInput = false;
  ngOnInit(): void {
    this.showData();
    // this.vendor();

    this.getData();
  }
  getData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/customer/metadata/getproductReview?limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.reviewList = data['data'];
            console.log(this.reviewList);
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
        '/api/v1/admin/product/getproductReviewById/' + this.activeid
      )
      .subscribe(
        (data) => {
          this.commonService.loader(false);
          if (data['success']) {
            this.reviewdetails = data['data'];
            console.log(this.reviewdetails['value']);
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
      () => this.commonService.setComponentname('Product Review Management'),
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
