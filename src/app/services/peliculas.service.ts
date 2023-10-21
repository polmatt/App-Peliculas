import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { tap, of, catchError } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';
import { VideoResponse } from '../interfaces/video-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';


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

  reesetCarteleraPage(){
    this.carteleraPage = 1;
  }

  buscarPeliculas( texto: string): Observable<Movie[]>{
    const params = {...this.params, page: '1', query: texto}
    
    //Servicio para buscar peliculas
     return this.http.get<any>(`${this.urlBase}/search/movie`, {
        params
      }).pipe(
        map( resp => resp.results)
      )
  }

  getPeliculaDetalle(id: string){
    return this.http.get<MovieResponse>(`${this.urlBase}/movie/${id}`, {
      params: this.params
  }).pipe(
    catchError( (err: any) => of(null))
  )
}
  getCast(id: string): Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${this.urlBase}/movie/${id}/credits`, {
      params: this.params
  }).pipe(
    map(res => res.cast),
    catchError( (err: any) => of([])),
  )
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

    getVideos(id: string): Observable<VideoResponse> {
      return this.http.get<VideoResponse>(`${this.urlBase}/movie/${id}/videos`, {
        params: this.params
      }).pipe(
        tap( () => {
          this.carteleraPage += 1;
          this.loading = false
        })
      )
    }
  }


