import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingService } from '../../services/rating';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.scss']
})
export class RatingComponent implements OnInit {
  @Input() postId!: string;
  @Input() readonly: boolean = false;

  stars: number[] = [1, 2, 3, 4, 5];
  hoverRating: number = 0;
  averageRating: number = 0;
  votesCount: number = 0;

  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    const stats = this.ratingService.getAverage(this.postId);
    this.averageRating = stats.avg;
    this.votesCount = stats.count;
  }

  onStarHover(rating: number): void {
    if (!this.readonly) this.hoverRating = rating;
  }



  onStarClick(rating: number): void {
    if (!this.readonly) {
      this.ratingService.saveRating(this.postId, rating);
      this.loadStats(); // Odśwież statystyki natychmiast
    }
  }
}
