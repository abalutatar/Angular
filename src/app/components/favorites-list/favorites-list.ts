import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data';
import { AuthService } from '../../services/auth'; 
import { BlogItem } from '../blog-item/blog-item';
import { map, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-favorites-list',
  standalone: true,
  imports: [CommonModule, BlogItem, RouterModule],
  templateUrl: './favorites-list.html',
  styleUrl: './favorites-list.scss'
})
export class FavoritesListComponent implements OnInit {
  public favoritePosts$: Observable<any[]> = of([]);

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const currentUserId = this.authService.currentUser?.userId;
    console.log('Zalogowany użytkownik ID:', currentUserId);

    if (!currentUserId) {
      console.warn('Użytkownik nie jest zalogowany - lista ulubionych będzie pusta.');
      return;
    }

    this.favoritePosts$ = this.dataService.getAll().pipe(
      map((posts: any[]) => {
        return posts.filter(post => 
          post.likes && post.likes.includes(currentUserId)
        );
      }),
      tap(filtered => console.log('Twoje polubione posty:', filtered))
    );
  }
}
