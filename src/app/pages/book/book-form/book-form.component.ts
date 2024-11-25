import { Component, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../book.type';

@Component({
  selector: 'app-book-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  book = input<Book|null>(null);
  form!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category_id: new FormControl([], [Validators.required]),
    });

    if (this.book()) {
      this.form.patchValue(this.book() as Book);
    }
  }
}
