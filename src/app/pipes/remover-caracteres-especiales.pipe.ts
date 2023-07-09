import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removerCaracteresEspeciales'
})
export class RemoverCaracteresEspecialesPipe implements PipeTransform {

  transform(text: string): string {
    return text.replace(/&[^;]+;/g, '');
  }
}
