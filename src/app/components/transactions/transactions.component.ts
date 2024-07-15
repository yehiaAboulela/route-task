import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { TransactionsService } from '../../shared/services/transactions.service';
import { Transaction } from './../../shared/interfaces/transaction';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  constructor(
    private route: ActivatedRoute,
    private TransactionsService: TransactionsService
  ) {}
  @Input() lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Transactions' },
  ];
  @Input() lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  transactions: Transaction[] = [];

  ngOnInit(): void {
    this.TransactionsService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res;
        this.route.params.subscribe({
          next: (data) => {
            let hamda = 123;
            let dates: string[] = [];
            let amounts: number[] = [];
            this.transactions.forEach((transaction) => {
              if (transaction.customer_id == data['id']) {
                dates.push(transaction.date);
                amounts.push(transaction.amount);
              }
            });
            this.lineChartData[0].data = amounts;
            this.lineChartLabels = dates;
          },
        });
      },
    });
  }
}
