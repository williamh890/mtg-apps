import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-watchful-radstag',
  templateUrl: './watchful-radstag.component.html',
  styleUrls: ['./watchful-radstag.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class WatchfulRadstagComponent implements OnInit {
  imageHeight = 0;
  imageWidth = 0;

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('radstagImage') cardImage!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log('resizing', this.cardImage);
    if(!this.cardImage) {
      return;
    }

    const width = this.cardImage.nativeElement.offsetWidth;
    const height = this.cardImage.nativeElement.offsetHeight;

    this.imageHeight = height;
    this.imageWidth = width;
  }
}
