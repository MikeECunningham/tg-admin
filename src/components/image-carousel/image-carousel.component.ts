import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-image-carousel",
  templateUrl: "./image-carousel.component.html",
  styleUrls: ["./image-carousel.component.scss"]
})
export class ImageCarouselComponent implements OnInit {

  @Input() images: string[];
  @Output()
  currentImageSelected = new EventEmitter<number>();
  _currentImage = 0;

  get currentImage() { return this._currentImage; }
  set currentImage(value) {
    this._currentImage = value;
    this.currentImageSelected.emit(value);
  }

  constructor() {
  }

  ngOnInit() {
  }

  goLeft() {
    this.currentImage = this.currentImage === 0 ? this.images.length - 1 : this.currentImage - 1;
  }

  goRight() {
    this.currentImage = this.currentImage === this.images.length - 1 ? 0 : this.currentImage + 1;
  }
}
