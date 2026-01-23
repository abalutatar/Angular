import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService, Comment } from '../../services/comments';


@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.html',
  styleUrl: './comments-section.scss',
})
export class CommentsSection {

  @Input() postId!: string;

  newAuthor: string = '';
  newText: string = '';

  constructor(private commentsService: CommentsService) { }

  get comments(): Comment[] {
    return this.commentsService.getComments(this.postId);
  }

  addComment() {
    if (!this.newAuthor || !this.newText) return;

    this.commentsService.addComment({
      postId: this.postId,
      author: this.newAuthor,
      text: this.newText,
      date: new Date(),
    });

    this.newAuthor = '';
    this.newText = '';
  }
}
