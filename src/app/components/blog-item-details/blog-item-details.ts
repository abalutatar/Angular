
import {ActivatedRoute, RouterModule} from '@angular/router';
import {DataService} from "../../services/data";
import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import { CommentsSection } from '../comments-section/comments-section';
@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CommentsSection], 
 // providers: [DataService],
  templateUrl: './blog-item-details.html',
  styleUrl: './blog-item-details.scss',
})
export class BlogItemDetailsComponent implements OnInit {
 public image: string = '';
 public text: string = '';
 public title: string = '';
 public id: string | null = null;


  constructor(private service: DataService, public route: ActivatedRoute, private cdr: ChangeDetectorRef) {
 }


 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const routeId = params.get('id');
    if (routeId) {
      this.id = routeId; // Przypisujemy ID do zmiennej klasowej
      
      this.service.getById(routeId).subscribe({
        next: (res: any) => {
          this.image = res.image;
          this.text = res.text;
          this.title = res.title || 'Brak tytułu';
          
          // To jest kluczowe, aby Angular zauważył zmiany danych
          this.cdr.markForCheck(); 
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Błąd pobierania posta:', err)
      });
    }
  });
}
}

