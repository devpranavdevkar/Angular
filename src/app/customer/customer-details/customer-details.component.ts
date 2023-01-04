import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private commonService: CommonService, private activeRoute: ActivatedRoute, private modalService: BsModalService) { }
  customerData: any;
  customerId = this.activeRoute.snapshot.params.id;
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  walletDetails: any;
  ngOnInit(): void {
    this.showData()
    this.walletData()
  }

  walletData(){
    this.commonService.loader(true)
    this.commonService.apiCall("get",`/api/v1/admin/customer/getWalletHistory/${this.customerId}?pageNo=${this.currentPage}&limit=${this.tableSize}`).subscribe(
      data=>{
        this.commonService.loader(false)
        if(data['success']){
          this.walletDetails = data['data']['usersData'];
          this.totalCount = data['data']['count'];
          for(let index1 in this.walletDetails){
            if(this.walletDetails[index1]['status'] == "1"){
              this.walletDetails[index1]['status'] = "Success";
            }else{
              this.walletDetails[index1]['status'] = "Failed";
            }
          }
        }else{
          this.commonService.flashMessage('error',"Error",data['message']);
        }
      },error=>{
        this.commonService.loader(false)
        console.log(error)
        this.commonService.flashMessage('error',"Error","No Data Available")
      }
    )
  }

  showData(){
    this.commonService.loader(true)
    this.commonService.apiCall("get","/api/v1/admin/customer/get?pageNo=0&limit=10").subscribe(
      data=>{

        if(data['success']){
          var customer;
          customer =data['data']['usersData'];
          for(let index1 in customer){
            if(customer[index1]['id'] == this.customerId ){
              this.customerData = customer[index1];
            }
          }
          this.commonService.loader(false)
        }else{
          this.commonService.flashMessage('error',"Error",data['message']);
          this.commonService.loader(false)
        }
      },error=>{
        this.commonService.loader(false)
        console.log(error)
        this.commonService.flashMessage('error',"Error","No Data Available")
      }
    )
  }

  delete(id){

  }

  selectData(post){

  }

  onTableDataChange(event){
    this.currentPage = event-1;
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
