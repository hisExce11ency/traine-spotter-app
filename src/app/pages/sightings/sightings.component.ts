import { Component } from '@angular/core';
import { NgbdCarouselPause } from './carousel-pause/carousel-pause.component';

@Component({
  selector: 'app-sightings',
  standalone: true,
  templateUrl: './sightings.component.html',
  styleUrls: ['./sightings.component.css'],
  imports: [NgbdCarouselPause],
})
export class SightingsComponent {

}
