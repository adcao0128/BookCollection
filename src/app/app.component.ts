import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http'
import { Book } from './models/book';
import { BookService } from './services/book.service'
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { FormsModule, NgForm } from '@angular/forms'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    EditBookComponent,
    FormsModule
  ],
  providers: [HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Books.UI';
  books: Book[] = [];
  bookToEdit?: Book;
  deleteBook?: Book;

  constructor (private bookService: BookService) {}

  ngOnInit() : void {
    this.bookService
    .getBooks()
    .subscribe((result: Book[]) => (this.books = result))
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (response: Book[]) => {
        this.books = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  });
  }

  public onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form')?.click();
    this.bookService.createBook(addForm.value).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  })
  }

  public onUpdateBook(book: Book): void {
    this.bookService.updateBook(book).subscribe({
      next: (response: Book) => {
        console.log(response);
        this.getBooks();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
  })
  }

  public onDeleteBook(bookId?: number): void {
    if (bookId !== undefined) {
      this.bookService.deleteBook(bookId).subscribe({
        next: (response: void) => {
          console.log(response);
          this.getBooks();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }

  public searchBooks(key: string): void {
    const results: Book[] = [];
    if (key && key.trim() !== ''){
      for (const book of this.books) {
        if (book.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || book.description.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(book);
        }
      }
      this.books = results;
      if (results.length === 0 || !key) {
        this.getBooks();
      }
    } else {
      this.getBooks();
    }

    
  }


  public onOpenModal(mode: string, book?: Book): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addBookModal');
    }
    if (mode === 'edit'){
      this.bookToEdit = book;
      button.setAttribute('data-target', '#updateBookModal');
    }
    if (mode === 'delete'){
      this.deleteBook = book
      button.setAttribute('data-target', '#deleteBookModal');
    }
    if (container) {
      container.appendChild(button);
      button.click();
    }

  }
}
