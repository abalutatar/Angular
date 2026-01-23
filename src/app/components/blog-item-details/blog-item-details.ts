import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-item-details',
  imports: [],
  templateUrl: './blog-item-details.html',
  styleUrl: './blog-item-details.scss',
})
export class BlogItemDetails {
  public image: string = 'http://osnews.pl/wp-content/uploads/2016/06/it-grafika.jpg';
  public text: string = 'Tytuł';
}
