import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../services/data";
import { BlogItem } from "../blog-item/blog-item";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';

import { FilterTextPipe } from '../../pipes/filter-text-pipe';
import { PaginatePipe } from '../../pipes/paginate-pipe';
import { PaginationComponent } from '../../shared/pagination/pagination';
import { ThemeService } from '../../services/theme';
import { RatingService } from '../../services/rating';
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItem, FilterTextPipe, CommonModule, PaginatePipe, PaginationComponent],
  providers: [DataService],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent implements OnInit {
  public items$: any[] = [];
  public pagedItems: any[] = [];
  @Input() filterText: string = '';

 //constructor(private service: DataService) {  }
  public currentPage = 1;
  public itemsPerPage = 20;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private ratingService: RatingService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    //this.items$ = this.service.getAll();
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']);
      this.currentPage = page > 0 ? page : 1;
    });
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }

  onPageChange(page: number): void {
    console.log('BlogComponent: Zmieniam stronę na:', page);

    // 1. Aktualizujemy wartość
    this.currentPage = page;

    // 2. KLUCZOWE: Tworzymy nową referencję tablicy. 
    // To "budzi" Angulara i zmusza go do ponownego przeliczenia Pipe'a z NOWĄ wartością currentPage.
    this.items$ = [...this.items$];

    // 3. Aktualizacja URL (opcjonalna dla działania, ale wymagana w zadaniu)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }
  applyLogic() {
    // 1. Filtrowanie po tekście
    let result = this.items$.filter(item =>
      item.text?.toLowerCase().includes(this.filterText.toLowerCase())
    );

    // 2. Opcjonalnie: Tutaj możesz dodać sortowanie result.sort(...)

    // 3. Paginacja (wycinanie kawałka dla pagedItems)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = result.slice(startIndex, startIndex + this.itemsPerPage);
  }
  sortItems(criteria: 'text' | 'rating') {
    if (criteria === 'rating') {
      this.items$.sort((a, b) => {
        const ratingA = this.ratingService.getAverage(a._id).avg;
        const ratingB = this.ratingService.getAverage(b._id).avg;
        return ratingB - ratingA; // Od najwyższej oceny
      });
    }
    this.applyLogic(); // Wywołaj swoją metodę do odświeżenia pagedItems
  }
  

}
