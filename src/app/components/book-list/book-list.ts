import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book';
import { SearchBarComponent } from '../search-bar/search-bar';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent implements OnInit {
  booksList: Book[] = [];
  filteredBooks: Book[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private bookService = inject(BookService);

  ngOnInit(): void {
    this.loadBooks();
  }

  // Charger tous les livres
  loadBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.booksList = data.works || [];
        this.filteredBooks = this.booksList;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.errorMessage = 'Erreur lors du chargement des livres.';
        this.isLoading = false;
      }
    });
  }

  // Recherche par titre (reçu du composant parent)
  onSearchByTitle(title: string): void {
    this.isLoading = true;
    
    this.bookService.getBooksByTitle(title).subscribe({
      next: (data) => {
        this.filteredBooks = data.docs || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Aucun livre trouvé.';
        this.isLoading = false;
      }
    });
  }

  // Recherche par année
  onSearchByYear(year: number): void {
    this.isLoading = true;
    
    this.bookService.getBooksByYear(year).subscribe({
      next: (data) => {
        this.filteredBooks = data.docs || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Aucun livre trouvé pour cette année.';
        this.isLoading = false;
      }
    });
  }

  // Obtenir URL de couverture
  getCoverUrl(coverId: number | undefined): string {
    if (!coverId) return 'https://via.placeholder.com/150?text=No+Cover';
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }
}
