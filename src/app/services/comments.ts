import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private apiUrl = 'http://localhost:3101/api/post'; // Prefiks zgodny z PostController

  constructor(private http: HttpClient) {}

  // GET /api/post/:id/comment
  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}/comment`);
  }

  // POST /api/post/:id/comment
  addComment(postId: string, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/comment`, { text });
  }

  // DELETE /api/post/:postId/comment/:commentId
  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${postId}/comment/${commentId}`);
  }
}
