import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../../services/data";
import { BlogItem } from "../blog-item/blog-item";
//import { CommonModule } from "@angular/common";
import { FilterTextPipe } from "../../pipes/filter-text-pipe";
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BlogItem, FilterTextPipe],
  providers: [DataService],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogComponent implements OnInit {
  public items$: any;
  @Input() filterText: string = '';
  constructor(private service: DataService) {
  }
  ngOnInit() {
    //this.items$ = this.service.getAll();
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(response => {
      this.items$ = response;
    });
  }


}
