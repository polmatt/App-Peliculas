import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from 'src/app/interfaces/cartelera-response';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements  OnInit {
public texto: string = '';
public movies: Movie[] = [];
loading: boolean = false;

  constructor( private _activatedRoute: ActivatedRoute,
               private _peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.loading = true;
    this._activatedRoute.params.subscribe(params => {
      //valor buscado
      this.texto = params['texto'];
      //LLamar al servicio para traer las peliculas
      this._peliculasService.buscarPeliculas(params['texto'])
        .subscribe( movies => {
          this.movies = movies;
        })
        //implementar loadig
      this.loading = false;

    });
  }



}
