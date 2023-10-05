import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent {

  @Input() movies?: Movie[] = [];

  constructor() {
   
   }

   ngOnInit(): void {
  
  }
}
