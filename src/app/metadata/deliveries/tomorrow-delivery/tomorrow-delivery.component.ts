import {AfterViewInit, Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CommonService} from "../../../service/common.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tomorrow-delivery',
  templateUrl: './tomorrow-delivery.component.html',
  styleUrls: ['./tomorrow-delivery.component.css']
})
export class TomorrowDeliveryComponent implements OnInit,AfterViewInit {
  listTomDeliveries=[]
  modalRef: BsModalRef;
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  constructor(private commonService: CommonService, private modalService: BsModalService, private newmodalService: NgbModal) { }

  ngOnInit(): void {
    this.showData()
  }


  ngAfterViewInit(): void {
    setTimeout(()=>this.commonService.setComponentname('Delivery Management'),0)
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.currentPage = 0;
    this.showData();
  }

  onTableDataChange(event){
    this.currentPage = event-1;
    this.showData();
  }


  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  showData(){
    this.commonService.loader(true)
    let tempUrl = "/api/v1/admin/order/getDeliveries?pageNo="+this.currentPage+"&limit="+this.tableSize
      +"&type=tomorrow";
    // if(this.orderId!=null){
    //   tempUrl+="&order_id="+this.orderId;
    // }
    this.commonService.apiCall("get",tempUrl).subscribe(
      data=>{
        if(data['success']){
          this.listTomDeliveries = data['data']['data'];
          this.totalCount = data['data']['count'];
          this.commonService.loader(false)
        }else{
          // this.commonService.flashMessage('error',"Error",data['message']);
          this.commonService.loader(false)
        }
      },error=>{
        this.commonService.loader(false)
        this.commonService.flashMessage('error',"Error","No Data Available")
      }
    )
  }
}

