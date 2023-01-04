import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css'],
})
export class ViewCustomerComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(
    private commonService: CommonService,
    private modalService: BsModalService
  ) {}
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  customer: any;
  ngOnInit(): void {
    this.showData();
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Customer Management'),
      0
    );
  }

  showData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/get?pageNo=${this.currentPage}&limit=${this.tableSize}`
      )
      .subscribe(
        (data) => {
          console.log(data);
          if (data['success']) {
            this.customer = data['data']['usersData'];
            this.totalCount = data['data']['count'];
            this.commonService.loader(false);
          } else {
            this.commonService.flashMessage('error', 'Error', data['message']);
            this.commonService.loader(false);
          }
        },
        (error) => {
          this.commonService.loader(false);
          console.log(error);
          this.commonService.flashMessage(
            'error',
            'Error',
            'No Data Available'
          );
        }
      );
  }

  delete(id) {}

  selectData(post) {}

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
}
