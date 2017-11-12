import { Injectable } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { RequestOptions } from '@angular/http';

@Injectable()
export class FileUploaderService {

  constructor(private tokenService: Angular2TokenService) {
      this.tokenService.init();
  }

  upload(formData) {
    let headers = this.tokenService.currentAuthHeaders;
    headers.delete('Content-Type');
    let options = new RequestOptions({ headers: headers });

    return this.tokenService.request({
      method: 'post',
      url: 'http://77.93.34.166:8088/api/demoReport?apiKey=o8lSKjbu7e%2F2T0gqbV6huS0XAYI3%2FMlg7TlK0f%2FUHbYLwQMPlqcUReYX3RzxZlwu&task=frontend',
      body: formData,
      headers: options.headers
    });
  }
}
