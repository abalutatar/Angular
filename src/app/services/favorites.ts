import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'blog_favorites';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }


  getFavorites(): string[] {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];

  }

  toggleFavorite(id: string): void {
    let favs = this.getFavorites();
    if (favs.includes(id)) {
      favs = favs.filter(favId => favId !== id);
    } else {
      favs.push(id);
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favs));
    }

  }

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }
}
