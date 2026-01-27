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
  /*
  ngOnInit() {
    const favIds = this.favService.getFavorites();
    console.log('ID zapisane w ulubionych:', favIds);
    // Pobieramy dane i filtrujemy je w locie
    this.favoritePosts$ = this.dataService.getAll().pipe(
      console.log('Wszystkie posty z API:', posts);
      map((posts: any[]) => posts.filter(p => favIds.includes(p._id)))
    );
  }*/
  ngOnInit() {
  const favIds = this.favService.getFavorites();
  console.log('1. ID pobrane z serwisu ulubionych:', favIds);

  this.favoritePosts$ = this.dataService.getAll().pipe(
    map((posts: any[]) => {
      console.log('2. Wszystkie posty pobrane z DataService:', posts);
      
      // Filtrowanie z dodatkowym sprawdzeniem nazw pól
      const filtered = posts.filter(p => {
        // Sprawdzamy czy post ma _id lub id i czy favIds je zawiera
        const postId = p._id || p.id;
        return favIds.includes(postId);
      });

      console.log('3. Posty po przefiltrowaniu:', filtered);
      return filtered;
    })
  );
}
}
