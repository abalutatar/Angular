
import {ActivatedRoute, RouterModule} from '@angular/router';
import {DataService} from "../../services/data";
import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule], 
 // providers: [DataService],
  templateUrl: './blog-item-details.html',
  styleUrl: './blog-item-details.scss',
})
export class BlogItemDetailsComponent implements OnInit {
 public image: string = '';
 public text: string = '';


  constructor(private service: DataService, public route: ActivatedRoute) {
 }


 ngOnInit() {
   this.route.paramMap.subscribe(params => {
     const id = params.get('id');
     if (!id) return;


     this.service.getById(id).subscribe((res: any) => {
       console.log('Dane z serwera:', res);
       this.image = res.image;
       this.text = res.text;

       
     });
   });
 }
}

