import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Location } from '@angular/common';
import { VideoResponse } from 'src/app/interfaces/video-response';
import { Cast } from 'src/app/interfaces/credits-response';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula?: MovieResponse
  public video?: VideoResponse
  public cast?: Cast[] = [];

 constructor(private _ActivatedRoute: ActivatedRoute,
             private _peliculasService: PeliculasService,
             private _location: Location,
             private _route: Router)
              { 

 }

 ngOnInit(): void {
   const id = this._ActivatedRoute.snapshot.params['id'];
    //Llamada al servicio para obtener el detalle de la pelicula
   this._peliculasService.getPeliculaDetalle( id ).subscribe ( movie => {
    if(!movie){
      this._route.navigateByUrl('/home');
      return
    }
     this.pelicula  = movie;
   })
   this.getVideo('id')

  this._peliculasService.getCast(id).subscribe( cast => {
    this.cast = cast.filter( actor => actor.profile_path !== null);
     
   })
  
 }

 onRegresar(){
   this._location.back();
 }

 verPelicula(){
  if (this.video && this.video.results && this.video.results.length > 0){
   window.open(`https://www.youtube.com/watch?v=${this.video?.results[0].key}`, '_blank')
  }
 }

 getVideo(id: string){
  const idVideo = this._ActivatedRoute?.snapshot.params['id'];
  this._peliculasService.getVideos(idVideo).subscribe( videos => {
    this.video = videos;

  })

}




}
