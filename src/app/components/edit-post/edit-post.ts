import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.scss'
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  message: string = '';
  postId: string | null = null;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    this.postForm = new FormGroup({
      // Tytuł: minimum 5 znaków
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      // Treść: minimum 10 znaków
      text: new FormControl('', [Validators.required, Validators.minLength(10)]),
      // Image: opcjonalny, jeśli wpisany, musi pasować do formatu URL
      image: new FormControl('', [Validators.pattern('https?://.+')])
    });
  }

ngOnInit() {
    
    this.postId = this.route.snapshot.paramMap.get('id');
    
    if (this.postId) {
      
      this.dataService.getById(this.postId).subscribe((post: any) => {
        if (post) {
          this.postForm.patchValue({
            title: post.title,
            text: post.text,
            image: post.image
          });
        }
      });
    }
  }

onSubmit() {
    if (this.postForm.valid && this.postId) {
      const { title, text, image } = this.postForm.value;
      this.dataService.updatePost(this.postId, { title, text, image }).subscribe({
        next: (response) => {
          this.message = 'Post zaktualizowany pomyślnie!';
          setTimeout(() => this.router.navigate(['/blog']), 1500);
        },
        error: (err) => {
          this.message = 'Błąd serwera przy edycji!';
          console.error(err);
        }
      });
    }
  }


}
