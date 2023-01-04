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
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('cityPriceModal') cityPriceModal;
  showModal: boolean;
  imagesrc: null;
  modalRef: BsModalRef;
  msg = '';
  currentProductVariable: any = {};
  productForm = new FormGroup({
    primary_image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    flavour: new FormControl('', [Validators.required]),
    is_on_sale: new FormControl('', [Validators.required]),
    sale_price: new FormControl(0),
    sale_percentage: new FormControl(0),
    type: new FormControl('', [Validators.required]),
  });

  // updateForm = new FormGroup({
  //   primary_image: new FormControl(''),
  //   price: new FormControl('',[Validators.required]),
  //   size: new FormControl('',[Validators.required]),
  //   flavour: new FormControl('',[Validators.required]),
  //   is_on_sale: new FormControl('',[Validators.required]),
  //   sale_price: new FormControl(0),
  //   sale_percentage: new FormControl(0),
  //   type: new FormControl('',[Validators.required]),
  // })
  deliveryAllowedCityData = [];
  categoryForm = new FormGroup({
    product_id: new FormControl('', [Validators.required]),
    image_url: new FormControl('', [Validators.required]),
  });

  updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    product_id: new FormControl('', [Validators.required]),
    image_url: new FormControl('', [Validators.required]),
  });

  AddColorForm = new FormGroup({
    product_id: new FormControl('', [Validators.required]),
    colorName: new FormControl('', [Validators.required]),
  });
  UpdateColorForm = new FormGroup({
    product_id: new FormControl('', [Validators.required]),
    colorName: new FormControl('', [Validators.required]),
  });

  cityPriceForm = new FormGroup({
    city_id: new FormControl('', Validators.required),
    product_variable_id: new FormControl('', []),
    price: new FormControl('', Validators.required),
    is_on_sale: new FormControl(0, Validators.required),
    sale_price: new FormControl('', Validators.required),
  });

  isOnSaleOptions = [
    { id: 0, name: 'No' },
    { id: 1, name: 'Yes' },
  ];
  is_on_Sale = false;
  constructor(
    public commonService: CommonService,
    private modalService: BsModalService,
    private activeRoute: ActivatedRoute
  ) {
    this.size = [
      { label: 'Small', value: 'Small' },
      { label: 'Medium', value: 'Medium' },
      { label: 'Large', value: 'Large' },
    ];
    this.sale = [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 },
    ];
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
  // selectedData = {
  //   id: null,
  //   category_id: null,
  //   product_name: null,
  //   primary_image: null,
  //   product_variables_images: null,
  //   price: null,
  //   mrp: null,
  //   size: null,
  //   color: null,
  //   flavour: null,
  //   is_on_sale: null,
  //   sale_price: null,
  //   sale_percentage: null,
  //   type: null,
  //   primary_image_url: null
  // }
  selectedData = {
    id: null,
    product_id: null,
    image_url: null,
  };
  productdetails: any;
  productData: any;
  selectedFile: File;
  subcategory: any;
  mainCategory = null;
  category: any;
  selectedProduct: any;
  categoryId = null;
  activeid = null;
  productList = [];
  showImageSelectionInput = false;
  ngOnInit(): void {
    this.showData();
    this.product();
    this.getDeliveryAllowedCity();
    this.getData();
  }
  getData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/product/getProducts?limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.productList = data['data']['productsData'];
            console.log(this.productList);
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
        '/api/v1/admin/product/getProductImage?product_id=' +
          this.activeid +
          '&pageNo=' +
          this.currentPage +
          '&limit=' +
          this.tableSize
      )
      .subscribe(
        (data) => {
          this.commonService.loader(false);
          if (data['success']) {
            this.productdetails = data['data'];
          
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
      () => this.commonService.setComponentname('Product Variable Management'),
      0
    );
  }

  product() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/product/getProducts?id=${this.activeid}=&limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe((data) => {
        this.commonService.loader(false);
        var newproduct;
        newproduct = data['data']['productsData'];
        for (let index1 in newproduct) {
          if (newproduct[index1]['id'] == this.activeRoute.snapshot.params.id) {
            this.productData = newproduct[index1];
          }
        }
        console.log(this.productData);
      });
  }
  getDeliveryAllowedCity() {
    this.commonService.loader(true);
    this.commonService.apiCall('get', `/api/system/getDeliveryCity`).subscribe(
      (data) => {
        this.commonService.loader(false);
        this.deliveryAllowedCityData = data['data']['data'];
        console.log(this.productData);
      },
      (error) => {
        console.log(error);
        this.commonService.flashMessage('error', 'Error', error.message);
      }
    );
  }

  onChangeIsSale(event) {
    console.log(event);
    if (event.value) {
      this.is_on_Sale = true;
    } else {
      this.is_on_Sale = false;
    }
  }
  onChangeSale(event) {
    console.log(event);
    if (event.value.value == 1) {
      this.is_on_Sale = true;
    } else {
      this.is_on_Sale = false;
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  // selectData(post){

  //   this.selectedSize = this.size.find((e)=>e['value'] == post.size)
  //   this.selectedSale = this.sale.find((e)=>e['value'] == post.is_on_sale)
  //   this.selectedData.id = post.id;
  //   this.selectedData.category_id = post.category_id;
  //   this.selectedData.product_name = post.product_name;
  //   this.selectedData.primary_image = post.primary_image;
  //   this.selectedData.price = post.price;
  //   this.selectedData.mrp = post.mrp;
  //   this.selectedData.color = post.color;
  //   this.selectedData.flavour = post.flavour;
  //   this.selectedData.sale_price = post.sale_price;
  //   this.selectedData.sale_percentage = post.sale_percentage;
  //   this.selectedData.type = post.type;
  //   this.selectedData.primary_image_url = (this.commonService.baseUrl+post.primary_image)
  //   this.onChangeIsSale(this.selectedSale)
  // }
  // update(id){
  //   if(this.selectedFile==null){
  //     this.updateForm.value.primary_image = this.selectedData.primary_image_url
  //   }
  //   console.log(this.updateForm.value)
  //   if(this.updateForm.valid){
  //     this.commonService.loader(true)
  //     this.updateForm.value.product_id = this.activeid;
  //     this.updateForm.value.is_on_sale = this.updateForm.value.is_on_sale.value;
  //     this.updateForm.value.size = this.updateForm.value.size.value;
  //     const formData = new FormData();
  //     if(this.selectedFile!=null){
  //       formData.append('primary_image', this.selectedFile, this.selectedFile.name);
  //       console.log(this.selectedFile.name)
  //     }
  //     formData.append('product_id', this.updateForm.value.product_id);
  //     formData.append('price', this.updateForm.value.price);
  //     formData.append('type', this.updateForm.value.type);
  //     formData.append('flavour', this.updateForm.value.flavour);
  //     formData.append('size', this.updateForm.value.size);
  //     formData.append('is_on_sale', this.updateForm.value.is_on_sale);
  //     formData.append('sale_price', this.updateForm.value.sale_price);
  //     formData.append('sale_percentage', this.updateForm.value.sale_percentage);
  //     this.updateForm.value.primary_image = formData;
  //     this.commonService.apiCall("post",`/api/v1/admin/product/updateProductVariable/${id}`, formData).subscribe(
  //       response=>{
  //         if(response['success']){
  //           this.modalRef.hide();
  //           this.commonService.loader(false)
  //           this.showData()
  //           this.commonService.flashMessage('success',"Success","Product Variable Updated Successfully")
  //         }else{
  //           this.commonService.flashMessage('error',"Error",response['message'])
  //           this.commonService.loader(false)
  //         }
  //       },error=>{
  //         this.commonService.loader(false)
  //         let  keys = Object.keys(error.data)
  //         for(let eachKey of keys){
  //           for(let eachMsg of error.data[eachKey]){
  //             this.commonService.flashMessage('error','Error',eachMsg)
  //           }
  //         }
  //       }
  //     )
  //   }else{
  //     this.commonService.flashMessage('error','Error',"Please Fill All Required Fields")
  //     let erroFields = [];
  //     console.log(erroFields)
  //     let keyMsgMapping ={"price"  : "Price is required",
  //       "sale_price"  : "Sale Price is required",
  //       "primary_image" : "Image is required",
  //       "size" : "Size is required",
  //       "type" : "Type is required",
  //       "is_on_sale" : "Please select is sale or not",
  //       "flavour" : "Flavour is required",
  //       "sale_percentage" : "Sale percentage is required"
  //     }
  //     console.log(keyMsgMapping)
  //     let keys = Object.keys(this.updateForm.controls)

  //     for(let eachKey of keys){
  //       if(this.updateForm.controls[eachKey]['errors']){
  //         console.log(this.updateForm.controls[eachKey]['errors'],eachKey)
  //         this.commonService.flashMessage('error','Error',keyMsgMapping[eachKey])
  //       }
  //     }
  //    }
  // }

  showInputFileButton() {
    this.showImageSelectionInput = true;
  }

  addDetails() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('product_id', this.activeid);
      formData.append(
        'primary_image',
        this.selectedFile,
        this.selectedFile.name
      );
      formData.append('price', this.productForm.value.price);
      formData.append('type', this.productForm.value.type);
      formData.append('flavour', this.productForm.value.flavour);
      formData.append('size', this.productForm.value.size);
      formData.append('is_on_sale', this.productForm.value.is_on_sale);
      formData.append('sale_price', this.productForm.value.sale_price);
      formData.append(
        'sale_percentage',
        this.productForm.value.sale_percentage
      );
      this.credentials.primary_image = formData;
      this.commonService.loader(true);
      this.commonService
        .apiCall(
          'post',
          '/api/v1/admin/product/createProductVariable',
          formData
        )
        .subscribe(
          (response) => {
            this.commonService.loader(false);
            if (response['success']) {
              this.modalRef.hide();
              this.showData();
              this.commonService.flashMessage(
                'success',
                'Success',
                'Product Variable Added Successfully'
              );
            } else {
              this.commonService.flashMessage(
                'error',
                'Error',
                response['message']
              );
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
    } else {
      this.commonService.flashMessage(
        'error',
        'Error',
        'Please Fill All Required Fields'
      );
      let erroFields = [];
      console.log(erroFields);
      let keyMsgMapping = {
        price: 'Price is required',
        sale_price: 'Sale Price is required',
        primary_image: 'Image is required',
        size: 'Size is required',
        type: 'Type is required',
        is_on_sale: 'Please select is sale or not',
        flavour: 'Flavour is required',
        sale_percentage: 'Sale percentage is required',
      };
      console.log(keyMsgMapping);
      let keys = Object.keys(this.productForm.controls);

      for (let eachKey of keys) {
        if (this.productForm.controls[eachKey]['errors']) {
          console.log(this.productForm.controls[eachKey]['errors'], eachKey);
          this.commonService.flashMessage(
            'error',
            'Error',
            keyMsgMapping[eachKey]
          );
        }
      }
    }
  }
  // delete(id: number){
  //   this.commonService.loader(true)
  //   this.commonService.apiCall("delete",`/api/v1/admin/product/deleteProductVariable/${id}`).subscribe(
  //     response=>{
  //       if(response['success']){
  //         this.commonService.loader(false)
  //         this.showData()
  //         this.commonService.flashMessage('success',"Success","Product Variable Deleted Successfully")
  //       }else{
  //         this.commonService.flashMessage('error',"Error",response['message'])
  //       }
  //     },error=>{
  //       this.commonService.loader(false)
  //       let  keys = Object.keys(error.data)
  //       for(let eachKey of keys){
  //         for(let eachMsg of error.data[eachKey]){
  //           this.commonService.flashMessage('error','Error',eachMsg)
  //         }
  //       }
  //     }
  //   )
  // }
  hideModal() {
    this.showImageSelectionInput = false;
    this.modalRef.hide();
  }

  delete(id: number) {
    this.commonService.loader(true);
    this.commonService
      .apiCall('post', `/api/v1/admin/product/deleteProductImage/${id}`)
      .subscribe(
        (response) => {
          this.commonService.loader(false);
          if (response['success']) {
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'Product Deleted Successfully'
            );
          } else {
            this.commonService.flashMessage(
              'error',
              'Error',
              response['message']
            );
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

  update(id) {
    this.commonService.loader(true);
    const formData = new FormData();
    if (this.selectedFile != null) {
      formData.append('image_url', this.selectedFile, this.selectedFile.name);
      console.log(this.selectedFile.name);
    }
    formData.append('product_id', this.updateForm.value.product_id.id);
    this.updateForm.value.category_thumbnail = formData;
    this.commonService
      .apiCall(
        'post',
        `/api/v1/admin/product/updateProductImage/${id}`,
        formData
      )
      .subscribe(
        (data) => {
          this.showImageSelectionInput = false;

          if (data['success']) {
            this.modalRef.hide();
            this.commonService.loader(false);
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'Product Updated Successfully'
            );
          } else {
            this.commonService.flashMessage('error', 'Error', data['message']);
            this.commonService.loader(false);
          }
        },
        (error) => {
          this.showImageSelectionInput = false;
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
  addImages() {
    if (this.categoryForm.valid) {
      this.commonService.loader(true);
      const formData = new FormData();
      formData.append('product_id', this.categoryForm.value.product_id.id);
      formData.append('image_url', this.selectedFile, this.selectedFile.name);
      // this.categoryForm.category_thumbnail = formData;
      this.commonService
        .apiCall(
          'post',
          '/api/v1/admin/product/addMultipleImagestoOneSingleproduct',
          formData
        )
        .subscribe(
          (data) => {
            this.commonService.loader(false);

            if (data['success']) {
              this.modalRef.hide();
              this.showData();

              this.commonService.flashMessage(
                'success',
                'Success',
                'product Image Added Successfully'
              );
            } else {
              this.commonService.flashMessage(
                'error',
                'Error',
                data['message']
              );
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
    } else {
    }
  }

  addColor() {
    if (this.categoryForm.valid) {
      this.commonService.loader(true);
      const formData = new FormData();
      formData.append('product_id', this.categoryForm.value.product_id.id);
      formData.append('image_url', this.selectedFile, this.selectedFile.name);
      // this.categoryForm.category_thumbnail = formData;
      this.commonService
        .apiCall(
          'post',
          '/api/v1/admin/product/addMultipleImagestoOneSingleproduct',
          formData
        )
        .subscribe(
          (data) => {
            this.commonService.loader(false);

            if (data['success']) {
              this.modalRef.hide();
              this.showData();

              this.commonService.flashMessage(
                'success',
                'Success',
                'product Image Added Successfully'
              );
            } else {
              this.commonService.flashMessage(
                'error',
                'Error',
                data['message']
              );
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
    } else {
    }
  }

  selectData(post) {
    this.selectedData.id = post.id;
    this.selectedData.product_id = this.selectedProduct.product_id;
    this.selectedData.image_url = this.commonService.baseUrl + post.image_url;
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

  showCityPrice(data) {
    this.currentProductVariable = data;
    console.log(this.currentProductVariable);
    this.openModalWithClass(this.cityPriceModal);
  }

  createNewCityPrice() {
    console.log(this.cityPriceForm);

    if (this.cityPriceForm.valid) {
      let formData = this.cityPriceForm.value;

      formData['product_variable_id'] = this.currentProductVariable['id'];
      this.commonService.loader(true);
      this.commonService
        .apiCall(
          'post',
          '/api/v1/admin/product/createUpdateCityPrice',
          formData
        )
        .subscribe(
          (data) => {
            this.commonService.loader(false);
            if (data['success']) {
              this.currentProductVariable.city_price = data['data'];
              this.commonService.flashMessage(
                'Success',
                'Success',
                data['message']
              );
            } else {
              console.log(data);
              this.commonService.flashMessage(
                'error',
                'Error',
                data['message']
              );
            }
          },
          (error) => {
            console.log(error);
            this.commonService.loader(false);
            this.commonService.flashMessage('error', 'Error', error.message);
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
        city_id: 'Please Select City',
        price: 'Price is required',
      };
      let keys = Object.keys(this.cityPriceForm.controls);

      for (let eachKey of keys) {
        if (this.cityPriceForm.controls[eachKey]['errors']) {
          console.log(this.cityPriceForm.controls[eachKey]['errors'], eachKey);
          this.commonService.flashMessage(
            'error',
            'Error',
            keyMsgMapping[eachKey]
          );
        }
      }
    }
  }
}
