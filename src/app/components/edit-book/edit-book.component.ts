import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service'

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent implements OnInit{
  @Input() book?: Book;
  @Output() booksUpdated = new EventEmitter<Book[]>();

  constructor(private bookService: BookService) {}

  ngOnInit(): void {}

  updateBook(book: Book) {
    this.bookService.updateBook(book).subscribe((books: Book[]) => this.booksUpdated.emit(books));
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe((books: Book[]) => this.booksUpdated.emit(books));
  }

  createBook(book: Book) {
    this.bookService.createBook(book).subscribe((books: Book[]) => this.booksUpdated.emit(books));
  }

}
