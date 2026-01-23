import { Injectable } from '@angular/core';

export interface Comment {
  postId: string;
  author: string;
  text: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private comments: Comment[] = [];

  getComments(postId: string): Comment[] {
    return this.comments.filter(c => c.postId === postId);
  }

  addComment(comment: Comment): void {
    comment.date = new Date(); 
    this.comments.push(comment);
  }
}
