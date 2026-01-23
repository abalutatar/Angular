import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home';
import { AddPost } from './components/add-post/add-post';
import { CommonModule } from '@angular/common';
import { Gallery } from './components/gallery/gallery';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BlogHomeComponent, AddPost, Gallery],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  public counter: number = 0;
  showForm = false;
  showGallery = false;
  toggleForm() {
    this.showForm = !this.showForm;
    this.showGallery = false;
  }

  toggleGallery() {
    this.showGallery = !this.showGallery;
    this.showForm = false;
  }
}
