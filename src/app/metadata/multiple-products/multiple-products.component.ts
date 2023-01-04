import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'src/app/service/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-multiple-products',
  templateUrl: './multiple-products.component.html',
  styleUrls: ['./multiple-products.component.css']
})
export class MultipleProductsComponent implements OnInit {
  modalRef: BsModalRef;
  categoryForm = new FormGroup({
    product_id: new FormControl('', [Validators.required]),
    image_url: new FormControl('',[Validators.required]),
  })
  updateForm = new FormGroup({
    id:new FormControl('', [Validators.required]),
    product_id: new FormControl('', [Validators.required]),
    image_url: new FormControl('',[Validators.required]),
  })
  msg='';
  constructor(public commonService: CommonService, private modalService: BsModalService, private http: HttpClient) { }
  showModal: boolean;
  selectedFile:File = null;
  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  productList=[];
  product=[]
  currentPage = 0;
  category: any;
  selectedProduct:any
  imagesrc: any;
  mainCategory = 1;
  selectedData = {
    id: null,
    product_id: null,
    image_url: null,

  }
  showImageSelectionInput=false

  ngOnInit(): void {
    // this.showData()
    this.getData()

  }

  ngAfterViewInit(): void {
    setTimeout(()=>this.commonService.setComponentname('Category Management'),0)
  }
  getData(){
    this.commonService.loader(true)
    this.commonService.apiCall("get",`/api/v1/admin/product/getProducts?limit=${this.tableSize}&pageNo=${this.currentPage}`).subscribe(
      data=>{
        if(data['success']){
          this.product = data['data']['productsData'];
          console.log(this.product)
          this.commonService.loader(false)
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
  showData(){
    this.commonService.loader(true)
    this.commonService.apiCall("get",`/api/v1/admin/product/getProductImages?product_id=1&limit=${this.tableSize}&pageNo=${this.currentPage}`).subscribe(
      data=>{
        if(data['success']){

          this.productList = data['data']['product_data'];
          this.commonService.loader(false)
        }else{
          this.commonService.flashMessage('error',"Error",data['message'])
        }
      },error=>{
        this.commonService.loader(false)
        this.commonService.flashMessage('error',"Error","Something Went Wrong")
      }
    )
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
  selectData(post){
    this.selectedData.id = post.id;
    this.selectedData.product_id = this.selectedProduct.product_id;
    this.selectedData.image_url = (this.commonService.baseUrl+post.image_url)
  }

  delete(id: number){
    this.commonService.loader(true)
    this.commonService.apiCall("post",`/api/v1/admin/product/deleteProductImage/${id}`).subscribe(response=>{
      this.commonService.loader(false)
      if(response['success']){
        this.showData()
        this.commonService.flashMessage('success',"Success","Category Deleted Successfully")
      }else{
        this.commonService.flashMessage('error',"Error",response['message'])
      }
    },error=>{
      this.commonService.loader(false)
      let  keys = Object.keys(error.data)
      for(let eachKey of keys){
        for(let eachMsg of error.data[eachKey]){
          this.commonService.flashMessage('error','Error',eachMsg)
        }
      }
    })
  }

  update(id){
      this.commonService.loader(true)
      const formData = new FormData();
      if(this.selectedFile!=null){
        formData.append('image_url', this.selectedFile, this.selectedFile.name);
        console.log(this.selectedFile.name)
      }
      formData.append('product_id', this.updateForm.value.product_id.id);
      this.updateForm.value.category_thumbnail = formData;
      this.commonService.apiCall("post",`/api/v1/admin/product/updateProductImage/${id}`, formData).subscribe(
        data=>{
          this.showImageSelectionInput = false

          if(data['success']){
            this.modalRef.hide();
            this.commonService.loader(false)
            this.showData()
            this.commonService.flashMessage('success',"Success","Category Updated Successfully")
          }else{
            this.commonService.flashMessage('error',"Error",data['message'])
            this.commonService.loader(false)
          }
        },error=>{
          this.showImageSelectionInput = false
          this.commonService.loader(false)
          let  keys = Object.keys(error.data)
          for(let eachKey of keys){
            for(let eachMsg of error.data[eachKey]){
              this.commonService.flashMessage('error','Error',eachMsg)
            }
          }
        }
      )
  }

  onFileSelected(event){
    console.log(event)
    this.selectedFile = event.target.files[0];
  }
  addCategory(){
    if(this.categoryForm.valid ){
      this.commonService.loader(true)
      const formData = new FormData();
      formData.append('product_id', this.categoryForm.value.product_id.id)
      formData.append('image_url', this.selectedFile, this.selectedFile.name);
      // this.categoryForm.category_thumbnail = formData;
      this.commonService.apiCall("post","/api/v1/admin/product/addMultipleImagestoOneSingleproduct", formData).subscribe(
        data=>{
          this.commonService.loader(false)

          if(data['success']){
            this.modalRef.hide();
            this.showData()
            this.getData()
            this.commonService.flashMessage('success',"Success","Category Added Successfully")
          }else{
            this.commonService.flashMessage('error',"Error",data['message'])
            this.commonService.loader(false)
          }
        },error=>{
          this.commonService.loader(false)
          let  keys = Object.keys(error.data)
          for(let eachKey of keys){
            for(let eachMsg of error.data[eachKey]){
              this.commonService.flashMessage('error','Error',eachMsg)
            }
          }
        }

      )

  }else{

  }

  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

  }
  reset(){
    this.categoryForm.reset()
    this.msg="";
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

  showInputFileButton() {
    this.showImageSelectionInput = true;
    this.updateForm.value.image_url = null;
  }

  hideModal() {
    this.showImageSelectionInput = false
    this.modalRef.hide();
  }
}
