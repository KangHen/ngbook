import { Component, inject, OnInit, signal } from '@angular/core';
import { BookFormComponent } from '../book-form/book-form.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../book.service';
import { Book, BookForm, Categories, CategoriesResponse } from '../book.type';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-book-edit',
  imports: [RouterLink, BookFormComponent],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss'
})
export class BookEditComponent implements OnInit {
  private bookService = inject(BookService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  
  categories$ = this.bookService.getCategories();
  categories = signal<Categories>({});
  book = signal<Book|null>(null);

  name = signal('');
  id!: number;

  constructor() { 
    this.id = (this.activatedRoute.snapshot.paramMap.get('id') ?? 0) as number;
  }

  ngOnInit(): void {
    forkJoin([this.categories$, this.bookService.getBook(this.id)])
      .subscribe(([categories, book]) => {
        if (categories.data) {
          this.categories.set(categories.data);
        }

        if (book.data) {
          this.book.set(book.data);
          this.name.set(book.data.name);
        }
      });
  }

  onSubmited(event: BookForm) {
    this.bookService.updateBook(this.id, event)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['/']);
        }
      });
  }
}
