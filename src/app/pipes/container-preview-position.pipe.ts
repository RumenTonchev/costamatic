import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'containerPreviewPosition'
})
export class ContainerPreviewPositionPipe implements PipeTransform {

  transform(quantity: number | null, max: number, offset = 10): string {
    if (!quantity) {
      return '100%';
    }
    let result = ((100 - offset) * ((max - quantity) / max)) + offset;

    return `${result}%`;
  }

}
