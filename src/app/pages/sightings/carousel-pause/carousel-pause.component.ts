import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ngbd-carousel-pause',
  standalone: true,
  imports: [NgbCarouselModule, FormsModule],
  templateUrl: './carousel-pause.component.html',
})
export class NgbdCarouselPause implements OnInit, AfterViewInit {

  images: any[] = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: false }) carousel!: NgbCarousel;

  constructor() { }

  ngOnInit() {
    // Static data for testing
    this.images = [
      { Name: 'Image 1', Route: 'https://example.com/image1', ImageUrl: 'https://via.placeholder.com/600x300?text=Image+1' },
      { Name: 'Image 2', Route: 'https://example.com/image2', ImageUrl: 'https://via.placeholder.com/600x300?text=Image+2' },
      { Name: 'Image 3', Route: 'https://example.com/image3', ImageUrl: 'https://via.placeholder.com/600x300?text=Image+3' }
    ];
  }

  ngAfterViewInit() {
    // Now you can safely access the carousel after view initialization
    if (this.carousel) {
      console.log('Carousel initialized');
    }
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}