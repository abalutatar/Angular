import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'paginate', standalone: true, pure: false})
export class PaginatePipe implements PipeTransform {
  transform(items: any[], page: number, perPage: number): any[] {
    if (!items || items.length === 0) return [];
    const start = (page - 1) * perPage;

    console.log(`Wycinam od ${start} do ${start + perPage} dla strony ${page}`);
    return items.slice(start, start + perPage);
  }
}
