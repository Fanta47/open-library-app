import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetailsComponent implements OnInit {
  book: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      if (bookId) {
        this.loadBookDetails(bookId);
      }
    });
  }

  loadBookDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.book = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.errorMessage = 'Erreur lors du chargement des détails.';
        this.isLoading = false;
      }
    });
  }

  getCoverUrl(coverId: number | undefined): string {
    if (!coverId) return 'https://via.placeholder.com/300?text=No+Cover';
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }

  goBack(): void {
    window.history.back();
  }
}
