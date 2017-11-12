import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';


import { TransactionsComponent } from './components/transactions.component';
import { FileUploaderComponent } from './components/file.uploader.component';
import { TransactionsService } from './services/transactions.service';
import { FileUploaderService } from './services/file.uploader.service';
import { MonthFromNumberPipe } from './helpers/month.from.number.pipe';


@NgModule({
  declarations: [
    TransactionsComponent,
    FileUploaderComponent,
    MonthFromNumberPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [TransactionsService, FileUploaderService, Angular2TokenService],
  bootstrap: [TransactionsComponent, FileUploaderComponent]

})
export class AppModule { }
