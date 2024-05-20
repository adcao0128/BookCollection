import { Injectable } from '@angular/core';
import { Book} from '../models/book';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url = "Book";

  constructor(private http: HttpClient) { }

  public getBooks() : Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/${this.url}`);
  }

  public updateBook(book: Book) : Observable<Book> {
    return this.http.put<Book>(`${environment.apiUrl}/${this.url}`, book);
  }

  public createBook(book: Book) : Observable<Book> {
    return this.http.post<Book>(`${environment.apiUrl}/${this.url}`, book);
  }

  public deleteBook(bookId: number) : Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/${this.url}/${bookId}`);
  }
}
