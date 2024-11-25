import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BookFormComponent } from '../book-form/book-form.component';
import { Book, Categories, CategoriesResponse } from '../book.type';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-create',
  imports: [
    RouterLink,
    BookFormComponent,
  ],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.scss'
})
export class BookCreateComponent implements OnInit {
  private bookService = inject(BookService);
  router = inject(Router);
  
  categories = signal<Categories>({});

  constructor() { }

  ngOnInit(): void {
    this.bookService.getCategories()
      .subscribe((response: CategoriesResponse) => {
        if (response.data) {
          this.categories.set(response.data);
        }
    });
  }

  onSubmited(event: any) {
    this.bookService.createBook(event)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/']);
        }
      });
  }
}
