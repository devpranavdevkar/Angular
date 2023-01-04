import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../service/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css'],
})
export class ProductReviewComponent implements OnInit, AfterViewInit {
  @Input('orderId') orderId;
  pendingList = [];
  acceptedList = [];
  rejectedList = [];
  modalRef: BsModalRef;
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  yesorno: { label: string; value: number }[];
  unchecked: boolean = false;
  checked: boolean = true;
  is_accepted: boolean;
  // is_accepted: false;
  pendingReview = [];
  acceptedReview = [];
  rejectedReview = [];
  subcriptionList = [];
  constructor(
    private commonService: CommonService,
    private modalService: BsModalService,
    private newmodalService: NgbModal
  ) {
    this.yesorno = [
      { label: 'Ac', value: 1 },
      { label: 'Not Ac', value: 0 },
    ];
  }

  ngOnInit(): void {
    this.showData();
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Product Review Management'),
      0
    );
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.currentPage = 0;
    this.showData();
  }

  onTableDataChange(event) {
    this.currentPage = event - 1;
    this.showData();
  }

  acceptanceStatus(id, type) {
    console.log(id, type);
    let data = {};
    if (type == 'accept') {
      data = {
        is_accepted: 1,
      };
    } else {
      data = {
        is_accepted: 0,
      };
    }
    console.log(data);

    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'post',
        `/api/v1/admin/product/adminEditProductReview/${id}`,
        data
      )
      .subscribe(
        (response) => {
          if (response['success']) {
            // this.modalRef.hide();
            console.log(response);

            this.commonService.loader(false);
            this.commonService.flashMessage(
              'success',
              'Success',
              response['message']
            );
            this.showData();
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

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  showData() {
    this.pendingReview = [];
    this.acceptedReview = [];
    this.rejectedReview = [];
    this.commonService.loader(true);
    let tempUrl = `/api/v1/admin/product/getproductReview?limit=${this.tableSize}&pageNo=${this.currentPage}`;
    if (this.orderId != null) {
      tempUrl += '&order_id=' + this.orderId;
    }
    this.commonService.apiCall('get', tempUrl).subscribe(
      (data) => {
        if (data['success']) {
          this.subcriptionList = data['data']['data'];
          for (let i = 0; i < this.subcriptionList.length; i++) {
            if (this.subcriptionList[i].is_accepted == null) {
              this.pendingReview.push(this.subcriptionList[i]);
            }
            if (this.subcriptionList[i].is_accepted == 1) {
              this.acceptedReview.push(this.subcriptionList[i]);
            }
            if (this.subcriptionList[i].is_accepted == 0) {
              this.rejectedReview.push(this.subcriptionList[i]);
            }
          }
          console.log(
            this.acceptedReview,
            this.pendingReview,
            this.rejectedReview
          );

          this.totalCount = data['data']['count'];
          this.commonService.loader(false);
        } else {
          // this.commonService.flashMessage('error',"Error",data['message']);
          this.commonService.loader(false);
        }
      },
      (error) => {
        this.commonService.loader(false);
        this.commonService.flashMessage('error', 'Error', 'No Data Available');
      }
    );
  }

  handleChange(e) {
    console.log(e);
  }
}
