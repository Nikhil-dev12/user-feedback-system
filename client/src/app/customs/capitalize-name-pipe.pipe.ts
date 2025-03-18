import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeName'
})
export class CapitalizeNamePipePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
