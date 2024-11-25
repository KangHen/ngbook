import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookForm, BookResponse, BooksResponse, CategoriesResponse, SuccessResponse } from './book.type';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API = environment.HTTP_SERVER;
  private readonly ENDPOINT = `${this.API}/books`

  private http = inject(HttpClient);

  constructor() { }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${this.API}/categories`);
  }

  getBooks(): Observable<BooksResponse> {
    return this.http.get<BooksResponse>(this.ENDPOINT);
  }

  getBook(id: number): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${this.ENDPOINT}/show/${id}`);
  }

  createBook(data: BookForm): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${this.ENDPOINT}/store`, data);
  }

  updateBook(id: number, data: BookForm): Observable<SuccessResponse> {
    return this.http.put<SuccessResponse>(`${this.ENDPOINT}/update/${id}`, data);
  }

  deleteBook(id: number): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>(`${this.ENDPOINT}/delete/${id}`);
  }
}
