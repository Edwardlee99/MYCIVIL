import { Pipe, PipeTransform } from '@angular/core';
import Fuse from 'fuse.js';



@Pipe({
  name: 'fuse'
})
export class FusePipe implements PipeTransform {

  transform<T>(items: T[], term: string, options: Fuse.IFuseOptions<T>): any {
    if (term !== '') {
      const fuse = new Fuse(items, options);
      return fuse.search(term).map(result => result.item);
    } else {
      return items;
    }
  }


}
