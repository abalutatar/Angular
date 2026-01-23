import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Post } from '../../services/data';
import { map } from 'rxjs/operators'; // Required for transformation
import { Observable } from 'rxjs';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery implements OnInit {
  selectedImage: string | null = null;
  images$!: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // Przypisujemy strumień danych bezpośrednio do zmiennej
    this.images$ = this.dataService.getAll().pipe(
      map(posts => posts
        .map(p => p.image)
        .filter((img): img is string => !!img)
      )
    );
  }
  open(image: string) {
    this.selectedImage = image;
  }

  close() {
    this.selectedImage = null;
  }
}
