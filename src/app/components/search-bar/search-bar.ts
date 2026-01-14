import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBarComponent {
  @Output() searchByTitle = new EventEmitter<string>();
  @Output() searchByYear = new EventEmitter<number>();

  searchTitle: string = '';
  searchYear: number | null = null;
  private bookService = inject(BookService);

  // Recherche par titre
  onSearchTitle(): void {
    if (this.searchTitle.trim()) {
      this.searchByTitle.emit(this.searchTitle);
      this.searchTitle = '';
    }
  }

  // Recherche par année
  onSearchYear(): void {
    if (this.searchYear) {
      this.searchByYear.emit(this.searchYear);
      this.searchYear = null;
    }
  }
}
