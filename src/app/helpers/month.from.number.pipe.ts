import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'monthFromNumber'})
export class MonthFromNumberPipe implements PipeTransform {

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November' , 'December'];
  transform(monthNumber: number): string {
    return this.months[monthNumber-1];
  }
}
