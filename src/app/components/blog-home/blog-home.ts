import { Component, OnInit, ViewChild } from '@angular/core';
import {SearchBarComponent} from "../../shared/search-bar/search-bar";
import {BlogComponent} from "../blog/blog";
import { AddPost } from '../add-post/add-post';
import { CommonModule } from '@angular/common';
import { Gallery } from '../gallery/gallery';
import { RouterLink } from '@angular/router';
@Component({
 selector: 'app-blog-home',
 standalone: true,
 imports: [ SearchBarComponent, BlogComponent, AddPost, CommonModule, Gallery, RouterLink ],
 templateUrl: './blog-home.html',
 styleUrl: './blog-home.scss'
})
export class BlogHomeComponent implements OnInit {
 @ViewChild(BlogComponent) blogComponent!: BlogComponent;
 public filterText: string = '';

 constructor() { }

 ngOnInit(): void {
 }

 getName($event: string): void {
   this.filterText = $event;
 }
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
  refreshPosts() {
    if (this.blogComponent) {
      this.blogComponent.getAll(); 
    }
  }
}
