import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth'; 
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private url = 'http://localhost:3101/api/post';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  toggleLike(postId: string): Observable<any> {
    return this.http.post(`${this.url}/${postId}/like`, {});
  }

isLikedByMe(postLikes: string[]): boolean {
  const user = this.authService.currentUser;
  if (!user || !user.userId || !postLikes) return false;

  const myId = String(user.userId);
  return postLikes.some(likeId => String(likeId) === myId);
}
}
