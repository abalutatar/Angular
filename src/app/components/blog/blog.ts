import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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

  public currentPage = 1;
  public itemsPerPage = 21;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private ratingService: RatingService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']);
      this.currentPage = page > 0 ? page : 1;
    });
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(response => {
      console.log('Dane z API:', response);
      this.items$ = response;
      this.cdr.detectChanges();
    });
  }

  onPageChange(page: number): void {
    console.log('BlogComponent: Zmieniam stronę na:', page);

    this.currentPage = page;

    this.items$ = [...this.items$];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge'
    });
  }
  applyLogic() {
    let result = this.items$.filter(item =>
      item.text?.toLowerCase().includes(this.filterText.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedItems = result.slice(startIndex, startIndex + this.itemsPerPage);
  }
  sortItems(criteria: 'text' | 'rating') {
    if (criteria === 'rating') {
      this.items$.sort((a, b) => {
        const ratingA = this.ratingService.getAverage(a._id).avg;
        const ratingB = this.ratingService.getAverage(b._id).avg;
        return ratingB - ratingA;
      });
    }
    this.applyLogic();
  }
  

}
