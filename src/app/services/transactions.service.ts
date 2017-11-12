import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionsService {

  private transactionsUrl = 'http://77.93.34.166:8088/api/demoReport?apiKey=o8lSKjbu7e%2F2T0gqbV6huS0XAYI3%2FMlg7TlK0f%2FUHbYLwQMPlqcUReYX3RzxZlwu';

  constructor(
    private http: HttpClient) { }

  getTransactions():Observable<Object> {
    return this.http.get<Object>(this.transactionsUrl);
  }

}
