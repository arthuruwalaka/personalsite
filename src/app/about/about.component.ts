import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface GridCell {
  current: string;
  next: string;
  visible: boolean;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/images/grid/background1.png',
    'assets/images/grid/background2.png',
    'assets/images/grid/background3.png',
    'assets/images/grid/background4.png',
    'assets/images/grid/background5.png',
  ];
  gridImages: GridCell[] = [];
  private intervalId: any;
  private isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }
  ngOnInit() {
    this.initializeGrid();

    if (this.isBrowser) {
      this.intervalId = setInterval(() => {
        this.updateOneCell();
      }, 1200); // change 1 cell every 1.2s
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initializeGrid() {
    const total = 9; // 3x3
    this.gridImages = Array.from({ length: total }, () => {
      const rand = this.randomImage();
      return { current: rand, next: rand, visible: true };
    });
  }

  updateOneCell() {
    const idx = Math.floor(Math.random() * this.gridImages.length);
    const cell = this.gridImages[idx];
    const newImage = this.randomImage();

    // Trigger fade
    this.gridImages[idx] = {
      current: cell.current,
      next: newImage,
      visible: false
    };

    // After fade duration, finalize swap
    setTimeout(() => {
      this.gridImages[idx] = {
        current: newImage,
        next: newImage,
        visible: true
      };
    }, 1000); // matches CSS transition time
  }

  randomImage(): string {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
  // constructor(private route: ActivatedRoute) {}

  // ngAfterViewInit() {
  //   this.route.fragment.subscribe(fragment => {
  //     if (fragment) {
  //       document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   });
  // }

}
