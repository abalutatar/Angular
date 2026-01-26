import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-blog-item-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-item-image.html',
  styleUrl: './blog-item-image.scss',
})
export class BlogItemImage {
  @Input() image?: string;
}
