import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  table = {
    "records": [
        {
          "clientID": "3724782f-d245-4266-8dd0-cd216a602509",
          "creditCards": [
            {
              "id": "5dd4ee73-9dec-4716-8d2e-835191b24bc7",
              "monthsData": {
                "1": {
                  "rows": [
                    {
                      "timeStamp": "2017-01-07T11:26:12",
                      "type": "Debit",
                      "amount": 697.53
                    },
                    {
                      "timeStamp": "2017-01-25T03:45:36",
                      "type": "Credit",
                      "amount": 636.55
                    }
                  ],
                  "totals": {
                    "debit": 697.53,
                    "credit": 636.55
                  }
                },
                "2": {
                  "rows": [
                    {
                      "timeStamp": "2017-02-03T03:29:52",
                      "type": "Debit",
                      "amount": 390.65
                    },
                    {
                      "timeStamp": "2017-02-06T04:30:52",
                      "type": "Credit",
                      "amount": 503.44
                    },
                    {
                      "timeStamp": "2017-02-27T19:57:59",
                      "type": "Debit",
                      "amount": 281.4
                    }
                  ],
                  "totals": {
                    "debit": 672.05,
                    "credit": 503.44
                  }
                },
                "3": {
                  "rows": [
                    {
                      "timeStamp": "2017-03-02T08:23:07",
                      "type": "Credit",
                      "amount": 592.79
                    },
                    {
                      "timeStamp": "2017-03-09T15:11:19",
                      "type": "Debit",
                      "amount": 95.28
                    }
                  ],
                  "totals": {
                    "debit": 95.28,
                    "credit": 592.79
                  }
                }
              }
            },
            {
              "id": "8182f620-e335-4f98-b6cc-7a47f9bb34fa",
              "monthsData": {
                "1": {
                  "rows": [
                    {
                      "timeStamp": "2017-01-10T19:11:07",
                      "type": "Credit",
                      "amount": 303.49
                    },
                    {
                      "timeStamp": "2017-01-16T23:52:00",
                      "type": "Debit",
                      "amount": 739.99
                    },
                    {
                      "timeStamp": "2017-01-26T06:38:56",
                      "type": "Credit",
                      "amount": 761.38
                    }
                  ],
                  "totals": {
                    "debit": 739.99,
                    "credit": 1064.87
                  }
                },
                "2": {
                  "rows": [
                    {
                      "timeStamp": "2017-02-07T13:25:05",
                      "type": "Credit",
                      "amount": 826.33
                    },
                    {
                      "timeStamp": "2017-02-25T17:01:16",
                      "type": "Debit",
                      "amount": 744.41
                    }
                  ],
                  "totals": {
                    "debit": 744.41,
                    "credit": 826.33
                  }
                },
                "3": {
                  "rows": [
                    {
                      "timeStamp": "2017-03-04T16:11:45",
                      "type": "Credit",
                      "amount": 664.64
                    },
                    {
                      "timeStamp": "2017-03-06T09:52:42",
                      "type": "Debit",
                      "amount": 679.42
                    }
                  ],
                  "totals": {
                    "debit": 679.42,
                    "credit": 664.64
                  }
                }
              }
            }
          ]
        }
      ]
  };
  htmlTable = this.calcTable();
  title = 'Test task - Olena Yedyharova';

  calcTable() {
    console.log(this.table);

    console.log(this);

    let htmlTable = [];

    let blankTableRow = {
      clientID: undefined,
      creditCard: undefined,
      month: undefined,
      time: undefined,
      transactionType: undefined,
      amount: undefined,
      isTotal: false
    };

    let titleTableRow = Object.assign({}, blankTableRow);

    titleTableRow.clientID = {text: 'Client ID'};
    titleTableRow.creditCard = {text: 'Credit Card ID'};
    titleTableRow.month = {text: 'Month'};
    titleTableRow.time = {text: 'Timestamp'};
    titleTableRow.transactionType = {text: 'Transaction Type'};
    titleTableRow.amount = {text: 'Amount'};

    htmlTable.push(titleTableRow);

    let rowCount = 0;

    let followingRow = Object.assign({}, blankTableRow);
    let index1 = 0, index2 = -1, index3 = -1;
    let rowspan1, rowspan2, rowspan3;

    this.table.records.forEach( client => {

      rowspan1 = 0; rowspan2 = 0; rowspan3 = 0;

      let clientID, previousClientID;
      let creditCardID, previousCreditCardID;
      let monthNumber, previousMonthNumber;
      let time;
      let transactionType;
      let amount;

      let totalCredit;
      let totalDebit;

      clientID = client.clientID;

      client.creditCards.forEach( creditCard => {
        rowspan1++; index1++;

        creditCardID = creditCard.id;

        Object.keys(creditCard.monthsData).map( month => {
          rowspan2++; index2++;

          monthNumber = month;

          creditCard.monthsData[month].rows.forEach ( row => {
            rowspan3++; index3++;

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

            followingRow.time = {text: time};
            followingRow.transactionType = {text: transactionType};
            followingRow.amount = {text: amount};

            previousClientID = clientID;
            previousCreditCardID = creditCardID;
            previousMonthNumber = monthNumber;

            htmlTable.push(followingRow);
            followingRow = Object.assign({}, blankTableRow);

            if(rowCount > 0) {
              if(htmlTable[index1].clientID !== undefined) htmlTable[index1].clientID['rowSpan'] = rowspan1 + rowspan2 + rowspan3;
              if(htmlTable[index2].creditCard !== undefined) htmlTable[index2].creditCard['rowSpan'] = rowspan2 + rowspan3;
              if(htmlTable[index3].month !== undefined) htmlTable[index3].month['rowSpan'] = rowspan3;
            }

            rowCount++;

          });

          /*totalCredit = creditCard.monthsData[month].totals['credit'];
          totalDebit = creditCard.monthsData[month].totals['debit'];

          let totalCreditRow = Object.assign({}, blankTableRow);
          totalCreditRow.clientID = {text: "Total", colSpan: 4, rowSpan: 2};
          totalCreditRow.transactionType = {text: "Credit"};
          totalCreditRow.amount = {text: totalCredit};
          totalCreditRow.isTotal = true;

          let totalDebitRow = Object.assign({}, blankTableRow);
          totalDebitRow.transactionType = {text: "Debit"};
          totalDebitRow.amount = {text: totalDebit};

          htmlTable.push(totalCreditRow); rowCount++;
          htmlTable.push(totalDebitRow); rowCount++;*/


        });
      });
    });

    console.log(htmlTable);

    return htmlTable;
  }

  makeTableRow (clientID:object, creditCardID: object, month: object, time: object, transactionType:object, amount:object) {
    return [clientID, creditCardID, month, time, transactionType, amount];
  }
}
