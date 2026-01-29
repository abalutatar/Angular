import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.scss'
})
export class AddPost {
  postForm: FormGroup;
  message: string = '';

  constructor(private dataService: DataService, private router: Router) {
    this.postForm = new FormGroup({
      // Tytuł: minimum 5 znaków
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      // Treść: minimum 10 znaków
      text: new FormControl('', [Validators.required, Validators.minLength(10)]),
      // Image: opcjonalny, jeśli wpisany, musi pasować do formatu URL
      image: new FormControl('', [Validators.pattern('https?://.+')])
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const { title, text, image } = this.postForm.value;
   
     this.dataService.addPost(title, text,image).subscribe({
  next: (response) => {
    console.log('Sukces!', response);
    this.message = 'Post dodany pomyślnie!';
    this.postForm.reset();
  },
  error: (err) => {
    this.message = 'Błąd krytyczny!';
    console.dir(err); 
    alert('Błąd serwera: ' + (err.message || 'Brak połączenia'));
  }
});

    }
  }
}
