import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TabViewModule } from 'primeng-lts/tabview';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements AfterViewInit, OnInit {
  listOrders = [];
  modalRef: BsModalRef;
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  listUnpaidOrders: any;
  listPaidOrders: any;
  activeIndex1: number = 0;

  activeIndex2: number = 0;

  scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({
    title: `Tab ${i + 1}`,
    content: `Tab ${i + 1} Content`,
  }));
  constructor(
    private commonService: CommonService,
    private modalService: BsModalService,
    private newmodalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.showPaidData();
    this.showUnpaidData();
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Order Management'),
      0
    );
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.currentPage = 0;
    this.showPaidData();
    this.showUnpaidData();
  }

  onTableDataChange(event) {
    this.currentPage = event - 1;
    this.showPaidData();
    this.showUnpaidData();
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  showPaidData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        '/api/v1/admin/order/getOrders?paymentStatus=paid&pageNo=' +
          this.currentPage +
          '&limit=' +
          this.tableSize
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.listPaidOrders = data['data']['data'];
            console.log(this.listOrders);
            this.totalCount = data['data']['count'];
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
  showUnpaidData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        '/api/v1/admin/order/getOrders?paymentStatus=unpaid&pageNo=' +
          this.currentPage +
          '&limit=' +
          this.tableSize
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.listUnpaidOrders = data['data']['data'];
            console.log(this.listOrders);
            this.totalCount = data['data']['count'];
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

  assign(post) {
    console.log(post);
    const formData = new FormData();
    formData.append('vendor_id', post.vendor_id);
    formData.append('order_id', post.id);
    // var vendor_id = post.vendor_id;
    // var order_id = post.id;
    this.commonService.loader(true);
    this.commonService
      .apiCall('post', '/api/v1/admin/order/assignOrderToVendor', formData)
      .subscribe(
        (response) => {
          if (response['success']) {
            this.commonService.flashMessage(
              'success',
              'Success',
              'Order Assign Successfully'
            );
            this.commonService.loader(false);
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
          this.commonService.loader(false);
          this.commonService.flashMessage(
            'error',
            'Error',
            'Something Went Wrong'
          );
        }
      );
  }
}
