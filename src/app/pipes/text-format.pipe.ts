import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattext'
})
export class FormatTextPipe implements PipeTransform {
  transform(text: string, limit: number = 50): string {
    return text.length > limit ? text.substr(0, limit) + '...' : text;
  }
}
