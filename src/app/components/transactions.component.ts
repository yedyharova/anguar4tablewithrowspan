import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { MonthFromNumberPipe } from '../helpers/month.from.number.pipe';

@Component({
  selector: 'transactions-root',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  htmlTable = [];
  title = 'Test task - Olena Yedyharova';
  now = new Date();
  @ViewChild('errorGet') errorGet;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit() {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionsService.getTransactions()
      .subscribe(
        data => {
            this.htmlTable = this.calcHtmlTable(data["records"])
        },
        err => {
          let errorGet = this.errorGet.nativeElement;
          errorGet.hidden = false;
          errorGet.classList.add("show");
        }
      );
  }

  calcHtmlTable(table) {

    //transformed datas
    let htmlTable = [];

    //initial row state
    let blankTableRow = {
      clientID: undefined,
      creditCard: undefined,
      month: undefined,
      time: undefined,
      transactionType: undefined,
      amount: undefined,
      isTotal: false
    };

    let rowCount = 0;
    let index1, index2, index3;
    let rowspan1, rowspan2, rowspan3;
    let followingRow = Object.assign({}, blankTableRow);

    //cycle of transformation
    table.forEach( client => {
      rowspan1 = 0; index1 = rowCount; index1++;

      let clientID, previousClientID;
      let creditCardID, previousCreditCardID;
      let monthNumber, previousMonthNumber;
      let time;
      let transactionType;
      let amount;
      let totalCredit;
      let totalDebit;

      clientID = client.clientId;

      client.creditCards.forEach( creditCard => {
        rowspan2 = 0; index2 = rowCount; index2++;

        creditCardID = creditCard.id;

        Object.keys(creditCard.monthsData).map( month => {
          rowspan3 = 0; index3 = rowCount; index3++;

          monthNumber = month;

          creditCard.monthsData[month].rows.forEach ( row => {
            rowspan1++; rowspan2++; rowspan3++;

            time = row.timeStamp;
            transactionType = row.type;
            amount = row.amount;

            if (rowCount === 0) {
              followingRow.clientID = {text: clientID};
              followingRow.creditCard = {text: creditCardID};
              followingRow.month = {text: monthNumber};
            } else {
              if(previousClientID !== clientID) followingRow.clientID = {text: clientID};
              if(previousCreditCardID !== creditCardID) followingRow.creditCard = {text: creditCardID};
              if(previousMonthNumber !== monthNumber) followingRow.month = {text: monthNumber};
            }

            followingRow.time = {text: new Date(time)};
            followingRow.transactionType = {text: transactionType};
            followingRow.amount = {text: amount};

            previousClientID = clientID;
            previousCreditCardID = creditCardID;
            previousMonthNumber = monthNumber;

            htmlTable.push(followingRow);
            followingRow = Object.assign({}, blankTableRow);
            rowCount++;

          });

          if( creditCard.monthsData[month].totals &&
              creditCard.monthsData[month].totals['credit'] &&
              creditCard.monthsData[month].totals['debit']) {

                totalCredit = creditCard.monthsData[month].totals['credit'];
                totalDebit = creditCard.monthsData[month].totals['debit'];

                let totalCreditRow = Object.assign({}, blankTableRow);
                totalCreditRow.clientID = {text: "Total", colSpan: 4, rowSpan: 2};
                totalCreditRow.transactionType = {text: "Credit"};
                totalCreditRow.amount = {text: totalCredit};
                totalCreditRow.isTotal = true;

                let totalDebitRow = Object.assign({}, blankTableRow);
                totalDebitRow.transactionType = {text: "Debit"};
                totalDebitRow.amount = {text: totalDebit};
                totalDebitRow.isTotal = true;

                htmlTable.push(totalCreditRow); rowCount++;rowspan3++;rowspan2++;rowspan1++;
                htmlTable.push(totalDebitRow); rowCount++;rowspan3++;rowspan2++;rowspan1++;

          }

          if(rowCount > 0) {
            if(htmlTable[index3-1].month !== undefined) htmlTable[index3-1].month['rowSpan'] = rowspan3;
          }

        });

        if(rowCount > 0) {
          if(htmlTable[index2-1].creditCard !== undefined) htmlTable[index2-1].creditCard['rowSpan'] = rowspan2;
        }

      });

      if(rowCount > 0) {
        if(htmlTable[index1-1].clientID !== undefined) htmlTable[index1-1].clientID['rowSpan'] = rowspan1;
      }

    });

    return htmlTable;
  }

}
