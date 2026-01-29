import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

export interface Post {
  title: string;
  text: string;
  image?: string;
  id?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3101';

  constructor(private http: HttpClient) {
  }
  getAll() {
    return this.http.get<Post[]>(this.url + '/api/post');
  }
  addPost(title: string, text: string, image?: string): Observable<Post> {
    const newPost = {
      title: title,
      text: text,
      image: image || 'https://www.pandasecurity.com/en/mediacenter/src/uploads/2025/04/pandasecurity-smart-tvs-and-security-risks-what-you-need-to-know-1920x1281.webp'
    };
    const token = localStorage.getItem('token'); 
  const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<Post>(this.url + '/api/post', newPost, {headers});
  }
  getById(id: string) {
 return this.http.get(this.url + '/api/post/' + id);
}

toggleLike(postId: string): Observable<any> {
  return this.http.post(`${this.url}/api/post/${postId}/like`, {});
}

updatePost(id: string, data: any): Observable<any> {
  return this.http.put(`${this.url}/api/post/${id}`, data);
}

deletePost(id: string): Observable<any> {
  return this.http.delete(`${this.url}/api/post/${id}`);
}

}

