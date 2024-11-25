import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from './book.service';
import { Book, Categories } from './book.type';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-book',
  imports: [CommonModule, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  bookService = inject(BookService);

  books$ = this.bookService.getBooks();
  categories$ = this.bookService.getCategories();
  
  categories = signal<Categories>({});
  books = signal<Book[]>([]);

  constructor() { }

  ngOnInit(): void {
    forkJoin([this.books$, this.categories$])
      .subscribe(([books, categories]) => {
        if (categories.data) {
          this.categories.set(categories.data);
        }

        if (books.data) {
          this.books.set(books.data);
        }
      });
  }
}
