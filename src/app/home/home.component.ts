import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentText = '';
  fullText = 'Software Engineer';
  isDeleting = false;
  textIndex = 0;
  private animationSpeed = 100; // milliseconds
  private pauseTime = 2000; // pause between cycles
  private animationInterval: any;
  private isBrowser: boolean = false;
  private isPaused = false;

  // Array of titles to cycle through
  private titles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Mobile Developer',
    'ML Engineer',
    'Problem Solver'
  ];
  private currentTitleIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startTypewriterAnimation();
    } else {
      // For SSR, just show the first title
      this.currentText = this.fullText;
    }
  }

  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private startTypewriterAnimation() {
    this.animationInterval = setInterval(() => {
      if (this.isPaused) {
        return; // Skip this iteration if paused
      }

      if (!this.isDeleting) {
        // Typing
        if (this.textIndex < this.fullText.length) {
          this.currentText = this.fullText.substring(0, this.textIndex + 1);
          this.textIndex++;
        } else {
          // Finished typing, start pause
          this.isPaused = true;
          setTimeout(() => {
            this.isPaused = false;
            this.isDeleting = true;
          }, this.pauseTime);
        }
      } else {
        // Deleting
        if (this.textIndex > 0) {
          this.currentText = this.fullText.substring(0, this.textIndex - 1);
          this.textIndex--;
        } else {
          // Finished deleting, move to next title
          this.isDeleting = false;
          this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
          this.fullText = this.titles[this.currentTitleIndex];
          console.log(`Switching to: ${this.fullText} (index: ${this.currentTitleIndex})`);
        }
      }
    }, this.animationSpeed);
  }
}
