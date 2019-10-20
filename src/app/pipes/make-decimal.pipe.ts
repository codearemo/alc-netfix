import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'rate_decimal'
})

export class RateDecimalPipe implements PipeTransform {
  transform(rating: string) {
    return rating.includes('.') ? rating : rating + '.0';
  }
}
