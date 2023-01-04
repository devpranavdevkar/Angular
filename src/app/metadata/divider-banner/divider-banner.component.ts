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
  selector: 'app-divider-banner',
  templateUrl: './divider-banner.component.html',
  styleUrls: ['./divider-banner.component.css'],
})
export class DividerBannerComponent implements OnInit, AfterViewInit {
  showModal: boolean;
  imagesrc: null;
  modalRef: BsModalRef;

  slideForm = new FormGroup({
    banner_image: new FormControl('', [Validators.required]),

    is_active: new FormControl,
    navigating_parameter: new FormControl('', [Validators.required]),
  });

  updateForm = new FormGroup({
    banner_image: new FormControl('', [Validators.required]),

    is_active: new FormControl,
    navigating_parameter: new FormControl('', [Validators.required]),
  });
  msg = '';
  closeResult: string;
  modalOptions: NgbModalOptions;
  is_active = false;
  showImageSelectionInput: boolean;
  showDescriptionImageSelectionInput: boolean;
  slide: any;
  constructor(
    public commonService: CommonService,
    private modalService: BsModalService,
    private newmodalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
    // this.yesorno = [
    //   { label: 'Yes', value: 1 },
    //   { label: 'No', value: 0 },
    // ];
  }

  yesorno = [];

  credentials: any = {};
  totalCount = 0;
  tableSize = 15;
  tableSizes = [15, 30, 50, 100];
  currentPage = 0;
  selectedData = {
    id: null,

    banner_image: null,

    is_active: null,

    banner_image_url: null,
    navigating_parameter: null,
  };

  selectedIsActive = [
    { label: '', value: '' },
    { label: '', value: '' },
  ];

  selectedFile: File = null;

  ngOnInit(): void {
    this.showData();
  }

  showCategory() {
    this.commonService.loader(true);
    this.commonService
      .apiCall('get', `/api/v1/admin/product/getDividerBanner`)
      .subscribe(
        (data) => {
          if (data['success']) {
            this.slide = data['data']['data'];
            console.log(this.slide);
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
      () => this.commonService.setComponentname('Divider Banner Management'),
      0
    );
  }

  showData() {
    this.commonService.loader(true);
    this.commonService
      .apiCall(
        'get',
        `/api/v1/admin/product/getDividerBanner?limit=${this.tableSize}&pageNo=${this.currentPage}`
      )
      .subscribe(
        (data) => {
          if (data['success']) {
            this.slide = data['data']['data'];
            console.log(this.slide);
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


  addslide() {
    if (this.slideForm.valid) {
    
      const formData = new FormData();
      formData.append('is_active', this.slideForm.value.is_active);
      formData.append(
        'navigating_parameter',
        this.slideForm.value.navigating_parameter
      );
      formData.append(
        'banner_image',
        this.selectedFile,
        this.selectedFile.name
      );

      formData.append('is_active', this.slideForm.value.is_active);

      this.slideForm.value.banner_image = formData;
      this.commonService.loader(true);
      this.commonService
        .apiCall('post', '/api/v1/admin/product/createDividerBanner', formData)
        .subscribe(
          (response) => {
            if (response['success']) {
              this.modalRef.hide();
              this.commonService.loader(false);
              this.showData();
              this.slideForm.reset();
              this.commonService.flashMessage(
                'success',
                'Success',
                'slide Added Successfully'
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
        banner_image: 'Image is required',

        is_active: 'Please select is active or not',
        navigating_parameter: 'Product name is required',
      };
      console.log(keyMsgMapping);
      let keys = Object.keys(this.slideForm.controls);

      for (let eachKey of keys) {
        if (this.slideForm.controls[eachKey]['errors']) {
          console.log(this.slideForm.controls[eachKey]['errors'], eachKey);
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
    this.selectedIsActive = this.yesorno.find(
      (e) => e['value'] == post.is_active
    );

    this.selectedData.id = post.id;
    this.selectedData.navigating_parameter = post.navigating_parameter;
    this.selectedData.banner_image_url =
      this.commonService.baseUrl + post.banner_image;

    
  }
  update(id) {
    this.commonService.loader(true);
    console.log(this.slideForm.value);
    this.updateForm.value.is_active = this.updateForm.value.is_active.value;

    const formData = new FormData();
    if (this.selectedFile != null) {
      formData.append(
        'banner_image',
        this.selectedFile,
        this.selectedFile.name
      );
      console.log(this.selectedFile.name);
    }

    formData.append('is_active', this.updateForm.value.is_active);
    formData.append(
      'navigating_parameter',
      this.updateForm.value.navigating_parameter
    );
    this.updateForm.value.banner_image = formData;
    this.commonService
      .apiCall(
        'post',
        `/api/v1/admin/product/updateDividerBanner/${id}`,
        formData
      )
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
              'slide Updated Successfully'
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
  getValue(data) {
    return data == 1;
  }

  deleteslide(id: number) {
    this.commonService.loader(true);
    this.commonService
      .apiCall('delete', `/api/v1/admin/product/deleteDividerBanner/${id}`)
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
  onChangeIsActive(event, id) {
    // FormData.('is_active', this.updateForm.value.is_active);
    let data = {
      is_active: event?.checked,
    };
    console.log(event.checked + id);

    console.log(event);
    this.commonService
      .apiCall('post', `/api/v1/admin/product/updateDividerBanner/${id}`, data)
      .subscribe(
        (response) => {
          this.showImageSelectionInput = false;
          this.showDescriptionImageSelectionInput = false;
          if (response['success']) {
            // this.modalRef.hide();
            this.commonService.loader(false);
            this.showData();
            this.commonService.flashMessage(
              'success',
              'Success',
              'slide Updated Successfully'
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

    if (event.value) {
      this.is_active = true;
    } else {
      this.is_active = false;
    }
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
