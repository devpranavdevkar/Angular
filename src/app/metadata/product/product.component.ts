import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  showModal: boolean;
  imagesrc: null;
  modalRef: BsModalRef;
  productForm = new FormGroup({
    category_id: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    sub_category_id: new FormControl('', []),
    primary_image: new FormControl('', [Validators.required]),
    description_image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    mrp: new FormControl('', [Validators.required]),
    is_on_sale: new FormControl('', [Validators.required]),
    sale_price: new FormControl(0),
    sale_percentage: new FormControl(0),
    is_live: new FormControl('', [Validators.required]),
    is_new: new FormControl('', [Validators.required]),
    is_all_over_india: new FormControl('', [Validators.required]),
  });
  updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
    product_name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    sub_category_id: new FormControl('', []),
    description_image: new FormControl('', [Validators.required]),
    primary_image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    is_on_sale: new FormControl('', [Validators.required]),
    sale_price: new FormControl(0),
    sale_percentage: new FormControl(0),
    is_live: new FormControl('', [Validators.required]),
    is_new: new FormControl('', [Validators.required]),
    is_all_over_india: new FormControl('', [Validators.required]),
  });
  msg = '';
  closeResult: string;
  modalOptions: NgbModalOptions;
  is_on_Sale = false;
  constructor(
    public commonService: CommonService,
    private modalService: BsModalService,
    private newmodalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
    this.yesorno = [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 },
    ];
  }
  new: any;
  live: any;
  yesorno = [];
  selectedCategory = {
    category_id: null,
    category_name: null,
    category_thumbnail: null,
    parent_id: null,
  };
  selectedSubCategory = {
    category_id: null,
    category_name: null,
    category_thumbnail: null,
    parent_id: null,
  };
  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  selectedData = {
    id: null,
    category_id: null,
    product_name: null,
    description: null,
    sub_category_id: null,
    primary_image: null,
    price: null,
    mrp: null,
    is_on_sale: null,
    sale_price: null,
    sale_percentage: null,
    is_live: null,
    is_new: null,
    primary_image_url: null,
    description_image_url: null,
  };
  selectedIslive = [
    { label: '', value: '' },
    { label: '', value: '' },
  ];
  selectedIsnew = [
    { label: '', value: '' },
    { label: '', value: '' },
  ];
  selectedIsSale = [
    { label: '', value: '' },
    { label: '', value: '' },
  ];
  selectedIsAllIndia = [];
  product: any;
  selectedFile: File = null;
  selectedDescriptionFile: File = null;
  subcategory = [];
  mainCategory = null;
  category = [];
  categoryId = null;
  showImageSelectionInput = false;
  showDescriptionImageSelectionInput = false;
  ngOnInit(): void {
    this.showData();
    this.showCategory();
  }

  showCategory() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/customer/metadata/getCategory?mainCategory=1&pageNo=${this.currentPage}&limit=${this.tableSize}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.category = data['data'];
            this.commonService.loader(false);
          } else {
            this.commonService.flashMessage('error', 'Error', data['message']);
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

  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Product Management'),
      0
    );
  }
  onChangeCategory(event) {
    if (event.value != null) {
      this.commonService.loader(true);
      this.commonService
        .apiCall(
          'get',
          `/api/v1/admin/category/getSubCategory?parent_id=${event.value.id}&limit=${this.tableSize}&pageNo=${this.currentPage}`
        )
        .subscribe(
          (data) => {
            if (data['success']) {
              this.subcategory = data['data']['categoryData'];
              this.commonService.loader(false);
            } else {
              this.commonService.loader(false);
              this.subcategory = null;
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
    } else {
      this.subcategory = null;
    }
  }

  onSelectedCategory(event) {
    console.log(event);
    if (event != null) {
      this.commonService.loader(true);
      this.commonService
        .apiCall(
          'get',
          `/api/v1/admin/category/getSubCategory?parent_id=${event.id}&limit=${this.tableSize}&pageNo=${this.currentPage}`
        )
        .subscribe(
          (data) => {
            if (data['success']) {
              this.subcategory = data['data']['categoryData'];
              this.commonService.loader(false);
            } else {
              this.commonService.loader(false);
              this.subcategory = null;
            }
            if (event.sub_category != null) {
              for (let index1 in event.sub_category) {
                this.selectedSubCategory = this.subcategory.find(
                  (e) => e['id'] == event.sub_category[index1].id
                );
              }
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
    } else {
      this.subcategory = null;
    }
  }
  showData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/product/getProducts?limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.product = data['data']['productsData'];
            console.log(this.product);
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

  onFileSelected(event) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  onDescriptionImageFileSelected(event) {
    console.log(event.target.files[0]);
    this.selectedDescriptionFile = event.target.files[0];
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
  addProduct() {
    if (this.productForm.valid) {
      // this.credentials.is_on_sale = this.credentials.is_on_sale.value;
      // this.credentials.is_live = this.credentials.is_live.value;
      // this.credentials.is_new = this.credentials.is_new.value;
      const formData = new FormData();
      formData.append('product_name', this.productForm.value.product_name);
      formData.append('description', this.productForm.value.description);
      formData.append('category_id', this.productForm.value.category_id.id);
      formData.append(
        'primary_image',
        this.selectedFile,
        this.selectedFile.name
      );
      formData.append(
        'description_image',
        this.selectedDescriptionFile,
        this.selectedDescriptionFile.name
      );
      formData.append('price', this.productForm.value.price);
      formData.append('mrp', this.productForm.value.mrp);
      formData.append('is_on_sale', this.productForm.value.is_on_sale);
      formData.append('sale_price', this.productForm.value.sale_price);
      formData.append(
        'sale_percentage',
        this.productForm.value.sale_percentage
      );
      formData.append('is_live', this.productForm.value.is_live);
      formData.append('is_new', this.productForm.value.is_new);
      formData.append(
        'is_all_over_india',
        this.productForm.value.is_all_over_india
      );
      this.productForm.value.primary_image = formData;
      this.commonService.loader(true);
      this.commonService
        .apiCall('post', '/api/v1/admin/product/createProduct', formData)
        .subscribe(
          (response) => {
            if (response['success']) {
              this.modalRef.hide();
              this.commonService.loader(false);
              this.showData();
              this.productForm.reset();
              this.commonService.flashMessage(
                'success',
                'Success',
                'Product Added Successfully'
              );
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
    } else {
      this.commonService.flashMessage(
        'error',
        'Error',
        'Please Fill All Required Fields'
      );
      let erroFields = [];
      console.log(erroFields);
      let keyMsgMapping = {
        category_id: 'Plese Select Category',
        product_name: 'Product name is required',
        description: 'description is required',
        sub_category_id: 'Please select sub category',
        primary_image: 'Image is required',
        price: 'Price is required',
        mrp: 'MRP is required',
        is_on_sale: 'Please select is sale or not',
        is_live: 'Please select is live or not',
        is_new: 'Plese select is new or not',
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

  selectData(post) {
    console.log(post);
    this.selectedIslive = this.yesorno.find((e) => e['value'] == post.is_live);
    this.selectedIsnew = this.yesorno.find((e) => e['value'] == post.is_new);
    this.selectedIsSale = this.yesorno.find(
      (e) => e['value'] == post.is_on_sale
    );
    this.selectedIsAllIndia = this.yesorno.find(
      (e) => e['value'] == post.is_all_over_india
    );
    this.selectedData.id = post.id;
    this.selectedData.product_name = post.product_name;
    this.selectedData.description = post.description;
    this.selectedData.sub_category_id = post.sub_category_id;
    this.selectedData.price = post.price;
    this.selectedData.mrp = post.mrp;
    this.selectedData.sale_price = post.sale_price;
    this.selectedData.sale_percentage = post.sale_percentage;
    this.selectedData.primary_image_url =
    this.commonService.baseUrl + post.primary_image;
    this.selectedData.description_image_url =
    this.commonService.baseUrl + post.description_image;

    for (let index1 in post.categories) {
      this.selectedCategory = this.category.find(
        (e) => e['id'] == post.categories[index1].id
      );
      this.selectedData.category_id = this.selectedCategory.category_id;
      this.updateForm.value.category_id = this.selectedCategory.category_id;
    }
    console.log(this.selectedCategory);
    this.onSelectedCategory(this.selectedCategory);
    this.onChangeIsSale(this.selectedIsSale);
  }
  update(id) {
    this.commonService.loader(true);
    console.log(this.productForm.value);
    this.updateForm.value.is_on_sale = this.updateForm.value.is_on_sale.value;
    this.updateForm.value.is_live = this.updateForm.value.is_live.value;
    this.updateForm.value.is_new = this.updateForm.value.is_new.value;
    this.updateForm.value.is_all_over_india =
      this.updateForm.value.is_all_over_india.value;
    const formData = new FormData();
    if (this.selectedFile != null) {
      formData.append(
        'primary_image',
        this.selectedFile,
        this.selectedFile.name
      );
      console.log(this.selectedFile.name);
    }
    if (this.selectedDescriptionFile != null) {
      formData.append(
        'description_image',
        this.selectedDescriptionFile,
        this.selectedDescriptionFile.name
      );
      console.log(this.selectedDescriptionFile.name);
    }
    formData.append('product_name', this.updateForm.value.product_name);
    formData.append('description', this.updateForm.value.description);
    formData.append('category_id', this.updateForm.value.category_id.id);
    formData.append('price', this.updateForm.value.price);
    formData.append('is_on_sale', this.updateForm.value.is_on_sale);
    formData.append('sale_price', this.updateForm.value.sale_price);
    formData.append('sale_percentage', this.updateForm.value.sale_percentage);
    formData.append('is_live', this.updateForm.value.is_live);
    formData.append('is_new', this.updateForm.value.is_new);
    formData.append(
      'is_all_over_india',
      this.updateForm.value.is_all_over_india
    );
    this.updateForm.value.primary_image = formData;
    this.commonService
      .apiCall('post', `/api/v1/admin/product/updateProduct/${id}`, formData)
      .subscribe(
        (response) => {
          this.showImageSelectionInput = false;
          this.showDescriptionImageSelectionInput = false;
          if (response['success']) {
            this.modalRef.hide();
            this.commonService.loader(false);
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'Product Updated Successfully'
            );
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

  showInputFileButton() {
    this.showImageSelectionInput = true;
  }

  showInputDescriptionFileButton() {
    this.showDescriptionImageSelectionInput = true;
  }

  deleteProduct(id: number) {
    this.commonService.loader(true);
    this.commonService
      .apiCall('delete', `/api/v1/admin/product/deleteProduct/${id}`)
      .subscribe(
        (response) => {
          if (response['success']) {
            this.showData();
            this.commonService.loader(false);
            this.commonService.flashMessage(
              'success',
              'Success',
              'Product Deleted Successfully'
            );
          } else {
            console.log(response);
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
  open(content) {
    this.newmodalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
