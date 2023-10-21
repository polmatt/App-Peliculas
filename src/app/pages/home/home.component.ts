import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];


//InfinitScroll
  @HostListener('window:scroll', ['$event'])
  onscroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

   if ( pos > max ) {
    if(this.peliculasService.loading){
      return;
    }
      this.peliculasService.getCartelera().subscribe( resp => {
        this.movies.push(...resp.results);
     
      });
    } 
  }

  constructor( public peliculasService: PeliculasService ) {
   }

   ngOnInit(): void {
    this.peliculasService.getCartelera()
    .subscribe( resp => {    
      this.movies = resp.results;
      this.moviesSlideshow = resp.results
    });
   }

   ngOnDestroy(): void {
     this.peliculasService.reesetCarteleraPage();
   }

}
