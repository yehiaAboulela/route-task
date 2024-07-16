import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { Customer } from './shared/interfaces/customer';
import { Transaction } from './shared/interfaces/transaction';
import { FilterByAmountPipe } from './shared/pipes/filter-by-amount.pipe';
import { FilterByNamePipe } from './shared/pipes/filter-by-name.pipe';
import { CustomersService } from './shared/services/customers.service';
import { TransactionsService } from './shared/services/transactions.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    FilterByNamePipe,
    FilterByAmountPipe,
    TransactionsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'route-task';
  constructor(
    private CustomersService: CustomersService,
    private TransactionsService: TransactionsService
  ) {}

  // data
  customers: Customer[] = [];
  transactions: Transaction[] = [];
  // filters
  nameFilter = '';
  minAmount: number | null = null;
  maxAmount: number | null = null;
  // charts
  lineChartData: { data: number[]; label: string }[] = [
    {
      data: [],
      label: 'Transactions',
    },
  ];
  lineChartLabels: any[] = [];

  ngOnInit(): void {
    this.CustomersService.getCustomers().subscribe({
      next: (res) => {
        this.customers = res;
      },
    });
    this.TransactionsService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res;
        this.customers.map(
          (cur, index) => (cur.amount = this.transactions[index].amount)
        );
      },
    });
  }

  getCustomerTransations(id: string) {
    let newDates: any[] = [];
    let newAmounts: any[] = [];
    this.transactions.forEach((transaction) => {
      if (transaction.customer_id == id) {
        newDates.push(transaction.date);
        newAmounts.push(transaction.amount);
      }
    });
    this.lineChartData[0].data = newAmounts;
    this.lineChartLabels = newDates;
  }
}
