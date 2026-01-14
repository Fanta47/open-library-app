import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private httpClient = inject(HttpClient);
  
  private apiBaseUrl = 'https://openlibrary.org';

  // ✅ Méthode 1: Récupérer tous les livres informatique
  getBooks(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiBaseUrl}/subjects/computers.json`
    );
  }

  // ✅ Méthode 2: Récupérer un livre par son ID
  getBookById(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiBaseUrl}/works/${id}.json`
    );
  }

  // ✅ Méthode 3: Rechercher par titre
  getBooksByTitle(title: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiBaseUrl}/search.json?title=${title}`
    );
  }

  // ✅ Méthode 4: Rechercher par année d'édition
  getBooksByYear(year: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiBaseUrl}/search.json?first_publish_year=${year}`
    );
  }
}
