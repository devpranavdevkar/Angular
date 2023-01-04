import { AfterViewInit, Component, OnInit, TemplateRef } from '@angular/core';

import { CommonService } from 'src/app/service/common.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  categoryForm = new FormGroup({
    category_name: new FormControl('', [Validators.required]),
    category_thumbnail: new FormControl('', [Validators.required]),
  });
  updateForm = new FormGroup({
    category_name: new FormControl('', [Validators.required]),
    category_thumbnail: new FormControl('', [Validators.required]),
  });
  msg = '';
  constructor(
    public commonService: CommonService,
    private modalService: BsModalService,
    private http: HttpClient
  ) {}
  showModal: boolean;
  selectedFile: File = null;
  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  category: any;
  imagesrc: any;
  mainCategory = 1;
  selectedData = {
    id: null,
    category_name: null,
    category_thumbnail: null,
    thumbnail_url: null,
  };
  showImageSelectionInput = false;

  ngOnInit(): void {
    this.showData();
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => this.commonService.setComponentname('Category Management'),
      0
    );
  }
  showData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/category/getCategory?mainCategory=1&limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.category = data['data']['categoryData'];
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

  onTableDataChange(event) {
    this.currentPage = event - 1;
    this.showData();
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.currentPage = 0;
    this.showData();
  }
  selectData(post) {
    this.selectedData.id = post.id;
    this.selectedData.category_name = post.category_name;
    this.selectedData.thumbnail_url =
      this.commonService.baseUrl + post.category_thumbnail;
  }

  delete(id: number) {
    this.commonService.loader(true);
    this.commonService
      .apiCall('post', `/api/v1/admin/category/deleteCategory/${id}`)
      .subscribe(
        (response) => {
          this.commonService.loader(false);
          if (response['success']) {
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'Category Deleted Successfully'
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
      formData.append(
        'category_thumbnail',
        this.selectedFile,
        this.selectedFile.name
      );
      console.log(this.selectedFile.name);
    }

    formData.append('category_name', this.selectedData.category_name);
    this.updateForm.value.category_thumbnail = formData;
    this.commonService
      .apiCall('post', `/api/v1/admin/category/updateCategory/${id}`, formData)
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
              'Category Updated Successfully'
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

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }
  addCategory() {
    if (
      this.credentials.category_name != '' &&
      this.credentials.category_thumbnail != '' &&
      this.credentials.category_name != null &&
      this.credentials.category_thumbnail != null
    ) {
      this.commonService.loader(true);
      const formData = new FormData();
      formData.append('category_name', this.credentials.category_name);
      formData.append(
        'category_thumbnail',
        this.selectedFile,
        this.selectedFile.name
      );
      this.credentials.category_thumbnail = formData;
      this.commonService
        .apiCall('post', '/api/v1/admin/category/createCategory', formData)
        .subscribe(
          (data) => {
            this.commonService.loader(false);

            if (data['success']) {
              this.modalRef.hide();
              this.showData();
              this.commonService.flashMessage(
                'success',
                'Success',
                'Category Added Successfully'
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
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', 'Fields Are Empty!!!');
    }
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  reset() {
    this.categoryForm.reset();
    this.msg = '';
  }

  show(post) {
    this.showModal = true; // Show-Hide Modal Check
    this.imagesrc = post;
  }
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
    this.showImageSelectionInput = false;
  }

  showInputFileButton() {
    this.showImageSelectionInput = true;
    this.updateForm.value.category_thumbnail = null;
  }

  hideModal() {
    this.showImageSelectionInput = false;
    this.modalRef.hide();
  }
}
