import { Component, OnInit } from '@angular/core';
import {SearchBarComponent} from "../../shared/search-bar/search-bar";
import {BlogComponent} from "../blog/blog";

@Component({
 selector: 'app-blog-home',
 standalone: true,
 imports: [ SearchBarComponent, BlogComponent ],
 templateUrl: './blog-home.html',
 styleUrl: './blog-home.scss'
})
export class BlogHomeComponent implements OnInit {

 public filterText: string = '';

 constructor() { }

 ngOnInit(): void {
 }

 getName($event: string): void {
   this.filterText = $event;
 }
}
