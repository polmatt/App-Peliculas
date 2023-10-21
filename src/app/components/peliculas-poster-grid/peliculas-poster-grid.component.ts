import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent {

  @Input() movies?: Movie[] = [];

  constructor( private _router: Router) {
   
   }

   ngOnInit(): void {
  
  }

  onMovieClick( movie: Movie ){
    this._router.navigate(['/pelicula', movie.id]);
  }
}
