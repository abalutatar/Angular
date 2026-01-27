import { Injectable } from '@angular/core';

interface PostRatings {
  [postId: string]: number[];
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  private storageKey = 'blog_ratings';

  constructor() { }

  private getRatings(): PostRatings {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  saveRating(postId: string, rating: number): void {
    const ratings = this.getRatings();
    if (!ratings[postId]) ratings[postId] = [];
    ratings[postId].push(rating);
    localStorage.setItem(this.storageKey, JSON.stringify(ratings));
  }

  getAverage(postId: string) {
    const ratings = this.getRatings()[postId] || [];
    const count = ratings.length;
    const avg = count > 0 ? ratings.reduce((a, b) => a + b, 0) / count : 0;
    return { avg, count };
  }
}
