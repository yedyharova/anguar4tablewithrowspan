import { Component, ViewChild } from '@angular/core';
import { FileUploaderService } from '../services/file.uploader.service';


@Component({
  selector: 'file-uploader',
  templateUrl: './file.uploader.component.html'
})
export class FileUploaderComponent {
  @ViewChild('fileInput') fileInput;
  @ViewChild('uploadButton') uploadButton;
  @ViewChild('success') success;
  @ViewChild('error') error;
  @ViewChild('errorText') errorText;

  constructor(private fileUploaderService: FileUploaderService) {}

  check() {
    let fileBrowser = this.fileInput.nativeElement;
    let fileUploadButton = this.uploadButton.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      fileUploadButton.disabled = false;
    }
  }

  clean() {
    let success = this.success.nativeElement;
    let error = this.error.nativeElement;
    let errorText = this.errorText.nativeElement;

    success.hidden = true;
    error.hidden = true;
    errorText.innerHTML = "Some error occurred";
  }

  upload() {
    let fileBrowser = this.fileInput.nativeElement;
    let fileUploadButton = this.uploadButton.nativeElement;
    let success = this.success.nativeElement;
    let error = this.error.nativeElement;
    let errorText = this.errorText.nativeElement;

    success.hidden = true;
    error.hidden = true;
    errorText.innerHTML = "Some error occurred";

    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("ZIP", fileBrowser.files[0]);
      this.fileUploaderService.upload(formData).subscribe(
      res => {
        if(res && res['_body']) {
          let response = JSON.parse(res['_body']);
          if(response.succeeded && response.succeeded.length>0) {
            fileBrowser.value = "";
            fileUploadButton.disabled = true;
            success.hidden = false;
            success.classList.add("show");
          } else {
            if(response.errors && response.errors.length>0) {
              fileBrowser.value = "";
              fileUploadButton.disabled = true;
              error.hidden = false;success.hidden = true;
              errorText.innerHTML = response.errors[0];
              error.classList.add("show");
            }
          }
        }
      },
      err => {
        fileBrowser.value = "";
        fileUploadButton.disabled = true;
        error.hidden = false;success.hidden = true;
        errorText.innerHTML = "Could not upload the file";
        error.classList.add("show");
      });
    }
  }
}
