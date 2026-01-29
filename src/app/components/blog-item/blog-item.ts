import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { BlogItemImage } from "../blog-item-image/blog-item-image";
import { BlogItemText } from "../blog-item-text/blog-item-text";
import { CommonModule } from '@angular/common';
import { CommentsSection } from '../comments-section/comments-section';
import { FavoritesService } from '../../services/favorites';
import { RatingComponent } from '../../shared/rating/rating';
import { AuthService } from '../../services/auth';
import { DataService } from '../../services/data';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [BlogItemImage, BlogItemText, CommentsSection, CommonModule, RatingComponent, RouterLink],
  templateUrl: './blog-item.html',
  styleUrl: './blog-item.scss'
})
export class BlogItem implements OnInit{
  @Input() image?: string;
  @Input() text?: string;
  @Input() id: string = '';
  @Input() title?: string;
  @Input() likes: string[] = [];
  @Input() userId: string = '';

  constructor(private favoritesService: FavoritesService, private authService: AuthService, private dataService: DataService,private router: Router,
    private cdr: ChangeDetectorRef) { }

  activeLike: boolean = false;

ngOnInit() {
    this.updateLikeState();
  }
  private updateLikeState() {
    this.activeLike = this.favoritesService.isLikedByMe(this.likes);
  }

  toggleFavorite(): void {
    this.favoritesService.toggleLike(this.id).subscribe({
      next: (updatedPost: any) => {
        console.log('Likes z serwera:', updatedPost.likes);
        
        this.likes = updatedPost.likes || [];
        this.updateLikeState(); 
        this.cdr.markForCheck(); 
      }
    });
  }

  get likesCount(): number {
    return this.likes ? this.likes.length : 0;
  }  
  get isFavorite(): boolean {
    return this.favoritesService.isLikedByMe(this.likes);
  }
  get isOwner(): boolean {
    const currentUserId = this.authService.currentUser?.userId;
    return !!currentUserId && currentUserId === this.userId;
  }

onDelete(): void {
    if (confirm('Czy na pewno chcesz usunąć ten post?')) {
      this.dataService.deletePost(this.id).subscribe({
        next: () => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/blog']);
          });
        },
        error: (err) => {
          console.error('Błąd podczas usuwania:', err);
          alert('Nie udało się usunąć posta.');
        }
      });
    }
  }

}
