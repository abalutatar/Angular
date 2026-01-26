import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BlogHomeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  public counter: number = 0;
 
}
