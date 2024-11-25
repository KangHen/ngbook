import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-book-create',
  imports: [
    RouterLink,
    BookFormComponent
  ],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent {

}
