import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'runtime'
})
export class RunTimePipe implements PipeTransform {
  transform(runtime) {
    const minutes = +runtime % 60;
    let hours = 0;
    while (+runtime > 60) {
      runtime = runtime / 60;
      hours += 1;
    }

    return `${hours}hr ${minutes}min`;
  }
}
