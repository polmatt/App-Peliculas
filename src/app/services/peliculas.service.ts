import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';
import { tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  public loading: boolean = true

  private urlBase = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '72ea083a908ef5ad9e9a5cce7d9a5800',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }


  getCartelera(): Observable<CarteleraResponse> {

    this.loading = true
    return this.http.get<CarteleraResponse>(`${this.urlBase}/movie/now_playing`, {
      params: this.params
    }).pipe(
      tap( () => {
        this.carteleraPage += 1;
        this.loading = false
      })
    );
    
    };
  }


