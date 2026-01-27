import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data';
import { CommonModule } from '@angular/common';

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

  constructor(private dataService: DataService) {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
      image: new FormControl('')
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const { title, text, image } = this.postForm.value;
      /*
      this.dataService.addPost(title, text);

      this.message = 'Post dodany pomyślnie!';
      this.postForm.reset();

      setTimeout(() => this.message = '', 3000);*/
     this.dataService.addPost(title, text,image).subscribe({
  next: (response) => {
    console.log('Sukces!', response);
    this.message = 'Post dodany pomyślnie!';
    this.postForm.reset();
  },
  error: (err) => {
    this.message = 'Błąd krytyczny!';
    // To wypisze błąd niezależnie od formatu
    console.dir(err); 
    alert('Błąd serwera: ' + (err.message || 'Brak połączenia'));
  }
});

    }
  }
}
