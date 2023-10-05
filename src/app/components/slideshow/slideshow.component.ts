import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})

export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies?: Movie[] = [];

  //Variables
  public swiper?: Swiper;


  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,    
    });

  
  }

  ngOnInit(): void {
  }  

  onSlideNext(){
    this.swiper?.slideNext();
  }

  onSlidePrev(){
    this.swiper?.slidePrev();
  }

}
