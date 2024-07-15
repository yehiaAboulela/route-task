import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../interfaces/customer';

@Pipe({
  name: 'filterByName',
  standalone: true,
})
export class FilterByNamePipe implements PipeTransform {
  transform(value: Customer[], term: string): Customer[] {
    return value.filter((cur) =>
      cur.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
