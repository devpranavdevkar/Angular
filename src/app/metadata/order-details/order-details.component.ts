import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../service/common.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails:any;
  constructor(public commonService: CommonService,
              private modalService: BsModalService, private newmodalService: NgbModal,private activeRoute: ActivatedRoute) { }
  activeid = this.activeRoute.snapshot.params.id
  showModal: boolean;
  showImageSelectionInput=false;
  imagesrc: any;
  ngOnInit(): void {
    this.showData()
  }

  showData(){
    this.commonService.loader(true)
    this.commonService.apiCall("get","/api/v1/admin/order/getOrderDetails/"+this.activeid).subscribe(
      data=>{
        if(data['success']){
          this.orderDetails = data['data'];
          this.commonService.loader(false)
          console.log(this.orderDetails)
        }else{
          this.commonService.flashMessage('error',"Error",data['message']);
          this.commonService.loader(false)
        }
      },error=>{
        this.commonService.loader(false)
        this.commonService.flashMessage('error',"Error","No Data Available")
      }
    )
  }

  show(post)
  {
    this.showModal = true; // Show-Hide Modal Check
    this.imagesrc = post;
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
    this.showImageSelectionInput=false;
  }
}
