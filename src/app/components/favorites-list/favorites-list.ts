import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Dodano dla routerLink
import { DataService } from '../../services/data';
import { FavoritesService } from '../../services/favorites';
import { BlogItem } from '../blog-item/blog-item';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, BlogItem, RouterModule],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.scss' // Jeśli masz plik stylów
})
export class FavoritesListComponent implements OnInit {
  // Zmieniamy na Observable, aby async pipe w HTML działał
  public favoritePosts$: Observable<any[]> = of([]);

  constructor(
    private dataService: DataService,
    private favService: FavoritesService
  ) { }

  ngOnInit() {
    const favIds = this.favService.getFavorites();

    // Pobieramy dane i filtrujemy je w locie
    this.favoritePosts$ = this.dataService.getAll().pipe(
      map((posts: any[]) => posts.filter(p => favIds.includes(p._id)))
    );
  }
}
