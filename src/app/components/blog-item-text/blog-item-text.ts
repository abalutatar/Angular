import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { SummaryPipe } from '../../pipes/summary-pipe';
@Component({
  selector: 'app-blog-item-text',
  standalone: true,
  imports: [SummaryPipe, RouterModule, CommonModule],
  templateUrl: './blog-item-text.html',
  styleUrl: './blog-item-text.scss',
})
export class BlogItemText {
  @Input() text?: string;
  @Input() id?: number | string;
}
