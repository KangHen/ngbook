import { ChangeDetectionStrategy, Component, input, OnChanges, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book, BookForm, Categories } from '../book.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent implements OnChanges, OnInit {
  book = input<Book|null>(null);
  categories = input<Categories>();
  submited = output<BookForm>();

  form!: FormGroup;
  categoriesArray!:Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category_id: new FormControl(1, [Validators.required]),
    });
  }

  ngOnChanges(): void {
    if (this.categories()) {
      this.categoriesArray = this.categories() ? Object.keys(this.categories() as object) : [];
    }

    if (this.book()) {
      this.form.patchValue(this.book() as Book);
    }
  }

  submit() {
    if (this.form.valid) {
      const form: BookForm = {
        name: this.form.get('name')?.value,
        category_id: parseInt(this.form.get('category_id')?.value),
      }

      this.submited.emit(form);
    }
  }
}
