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
  private bookService = inject(BookService);

  books$ = this.bookService.getBooks();
  categories$ = this.bookService.getCategories();
  
  categories = signal<Categories>({});
  books = signal<Book[]>([]);

  showDeleteModal = false;
  deleteId = 0;

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

  onConfirmDelete(id: number) {
    this.showDeleteModal = true;
    this.deleteId = id;
  }

  onDeleted() {
    this.showDeleteModal = false;
    this.bookService.deleteBook(this.deleteId)
      .subscribe((response) => {
        if (response.success) {
          this.books$.subscribe((books) => {
            this.books.set(books.data);
          });
        }
      });
  }
}
