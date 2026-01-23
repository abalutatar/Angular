import { Component, Input } from '@angular/core';
import { BlogItemImage } from "../blog-item-image/blog-item-image";
import { BlogItemText } from "../blog-item-text/blog-item-text";
import { CommonModule } from '@angular/common';
import { CommentsSection } from '../comments-section/comments-section';

@Component({
  selector: 'app-blog-item',
  standalone: true,
  imports: [BlogItemImage, BlogItemText, CommentsSection, CommonModule],
  templateUrl: './blog-item.html',
  styleUrl: './blog-item.scss'
})
export class BlogItem {
  @Input() image?: string;
  @Input() text?: string;
  @Input() id: string = '';
  //@Input() post!: any;
}
