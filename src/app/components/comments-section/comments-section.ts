import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../services/comments';
import { AuthService } from '../../services/auth'; // Importuj swój serwis auth

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.html',
  styleUrl: './comments-section.scss',
})
export class CommentsSection implements OnInit {
  @Input() postId!: string;
  
  @Input() limit: number | null = null; 


  comments: any[] = []; // Używamy any lub zaktualizowanego interfejsu
  newText: string = '';
  currentUserEmail: string | null = null;
  currentUserName: string | null = null;
  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadComments();
    this.currentUserEmail = this.authService.getLoggedUserEmail();
    this.currentUserName = this.authService.getLoggedUserName();
    console.log("User: ", this.currentUserEmail );
  }

  loadComments() {
    this.commentsService.getComments(this.postId).subscribe((res) => {
      this.comments = res;
      this.cdr.detectChanges();
    });
  }

  addComment() {
    if (!this.newText.trim()) return;

    this.commentsService.addComment(this.postId, this.newText).subscribe({
      next: () => {
        this.newText = '';
        this.loadComments();
      },
      error: (err) => alert('Błąd: ' + err.message)
    });
  }

  deleteComment(commentId: string) {
    if (confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
      this.commentsService.deleteComment(this.postId, commentId).subscribe({
        next: () => this.loadComments(),
        error: (err) => alert('Nie możesz usunąć tego komentarza.')
      });
    }
  }

get displayComments() {
  if (!this.comments) return [];
  
  // Kopiujemy tablicę, żeby nie mutować oryginału, i odwracamy (najnowsze na górze)
  const sorted = [...this.comments].reverse(); 
  
  // Jeśli mamy ustawiony limit, tniemy tablicę
  return this.limit ? sorted.slice(0, this.limit) : sorted;
}
}
