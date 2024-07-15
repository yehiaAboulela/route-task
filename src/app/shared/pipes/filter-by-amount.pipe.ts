import { Customer } from './../interfaces/customer';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAmount',
  standalone: true,
})
export class FilterByAmountPipe implements PipeTransform {
  transform(
    value: Customer[],
    min: number | null,
    max: number | null
  ): Customer[] {
    if (min && max) {
      return value.filter(
        (cur) => (cur.amount as number) < max && (cur.amount as number) > min
      );
    } else if (max && !min) {
      return value.filter((cur) => (cur.amount as number) < max);
    } else if (min && !max) {
      return value.filter((cur) => (cur.amount as number) > min);
    } else {
      return value;
    }
  }
}
