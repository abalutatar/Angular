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
  //private nextId = 11;
  private url = 'http://localhost:3101';

  constructor(private http: HttpClient) {
  }

  /*
  public getAll() {
    return posts;
  }*/
  getAll() {
    return this.http.get<Post[]>(this.url + '/api/post');
  }
  /*
  public addPost(title: string, text: string, image?: string) {
    const newPost = {
      title: title,
      text: text,
      image: 'https://www.pandasecurity.com/en/mediacenter/src/uploads/2025/04/pandasecurity-smart-tvs-and-security-risks-what-you-need-to-know-1920x1281.webp',
      id: (new Date()).getTime().toString() + this.nextId++
    };
    posts.unshift(newPost);
  }*/
  addPost(title: string, text: string, image?: string): Observable<Post> {
    const newPost = {
      title: title,
      text: text,
      image: image || 'https://www.pandasecurity.com/en/mediacenter/src/uploads/2025/04/pandasecurity-smart-tvs-and-security-risks-what-you-need-to-know-1920x1281.webp'
    };

    return this.http.post<Post>(this.url + '/api/post', newPost);
  }
  getById(id: string) {
 return this.http.get(this.url + '/api/post/' + id);
}

}

