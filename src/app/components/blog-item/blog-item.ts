import { Component, Input } from '@angular/core';
import { BlogItemImage } from "../blog-item-image/blog-item-image";
import { BlogItemText } from "../blog-item-text/blog-item-text";
import { CommonModule } from '@angular/common';
import { CommentsSection } from '../comments-section/comments-section';
import { FavoritesService } from '../../services/favorites';
import { RatingComponent } from '../../shared/rating/rating';
@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [BlogItemImage, BlogItemText, CommentsSection, CommonModule, RatingComponent],
  templateUrl: './blog-item.html',
  styleUrl: './blog-item.scss'
})
export class BlogItem {
  @Input() image?: string;
  @Input() text?: string;
  @Input() id: string = '';
  //@Input() post!: any;

  constructor(private favoritesService: FavoritesService) { }

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.id);
  }

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.id);
  }
}
