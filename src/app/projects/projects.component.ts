import { Component, HostListener, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

interface Project {
  id: string;
  title: string;
  images?: ProjectImage[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnDestroy {
  selectedProject: Project | null = null;
  selectedImageIndex = 0;
  showModal = false;
  
  // New properties for enhanced functionality
  imageLoading = false;
  touchStartX = 0;
  touchStartY = 0;

  projects: Project[] = [
    {
      id: 'portfolio',
      title: 'Portfolio Site',
      images: [
        { src: 'assets/images/portfolio/homepage.png', alt: 'Portfolio Homepage', caption: 'Homepage Design' },
        { src: 'assets/images/portfolio/mobile.png', alt: 'Mobile View', caption: 'Mobile Responsive Design' },
        { src: 'assets/images/portfolio/wireframe.png', alt: 'Wireframe', caption: 'Initial Wireframe' }
      ]
    },
    {
      id: 'twitter-bookmarks',
      title: 'Twitter Bookmarks Search',
      images: [
        { src: 'assets/images/twitter/search.png', alt: 'Search Interface', caption: 'Search Functionality' },
        { src: 'assets/images/twitter/results.png', alt: 'Search Results', caption: 'Results Display' }
      ]
    },
    {
      id: 'calendar-med',
      title: 'Calendar Med',
      images: [
        { src: 'assets/images/calendar/login.PNG', alt: 'Login' },
        { src: 'assets/images/calendar/home.PNG', alt: 'Home' },
        { src: 'assets/images/calendar/calender.PNG', alt: 'Calender' },
        { src: 'assets/images/calendar/search.PNG', alt: 'Search' },
        { src: 'assets/images/calendar/events.PNG', alt: 'Events' },
        { src: 'assets/images/calendar/conflict.PNG', alt: 'Conflict' }
      ]
    },
    {
      id: 'habit-tracker',
      title: 'Habit Tracker',
      images: [
        { src: 'assets/images/habits/main.png', alt: 'Main App', caption: 'Main Application View' },
        { src: 'assets/images/habits/tracking.png', alt: 'Habit Tracking', caption: 'Progress Tracking' }
      ]
    },
    {
      id: 'uniye',
      title: 'UNIYE',
      images: [
        { src: 'assets/images/uniye/collaboration.png', alt: 'Collaboration', caption: 'Student Collaboration' },
        { src: 'assets/images/uniye/learning.png', alt: 'Learning', caption: 'Learning Interface' }
      ]
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Keyboard navigation
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.showModal) return;
    
    switch(event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.previousImage();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case ' ':
        event.preventDefault();
        this.nextImage();
        break;
    }
  }

  openImageModal(projectId: string, imageIndex: number = 0) {
    this.selectedProject = this.projects.find(p => p.id === projectId) || null;
    this.selectedImageIndex = imageIndex;
    this.showModal = true;
    this.imageLoading = true; // Start loading state
    
    // Prevent background scrolling
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('modal-open');
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedProject = null;
    this.selectedImageIndex = 0;
    this.imageLoading = false;
    
    // Restore background scrolling
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('modal-open');
    }
  }

  nextImage() {
    if (this.selectedProject?.images) {
      this.imageLoading = true; // Show loading for next image
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  previousImage() {
    if (this.selectedProject?.images) {
      this.imageLoading = true; // Show loading for previous image
      this.selectedImageIndex = this.selectedImageIndex === 0 
        ? this.selectedProject.images.length - 1 
        : this.selectedImageIndex - 1;
    }
  }

  getCurrentImage(): ProjectImage | null {
    if (!this.selectedProject?.images) return null;
    return this.selectedProject.images[this.selectedImageIndex];
  }

  // Helper methods for safe navigation checks
  shouldShowNavigation(): boolean {
    return !!(this.selectedProject?.images && this.selectedProject.images.length > 1);
  }

  getImageCount(): number {
    return this.selectedProject?.images?.length || 0;
  }

  // Touch gesture handling
  onTouchStart(event: TouchEvent) {
    event.preventDefault(); // Prevent default touch behavior
    event.stopPropagation(); // Stop event bubbling
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault(); // Prevent background scrolling
    event.stopPropagation(); // Stop event bubbling
  }

  onTouchEnd(event: TouchEvent) {
    event.preventDefault(); // Prevent default touch behavior
    event.stopPropagation(); // Stop event bubbling
    
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const diffX = this.touchStartX - touchEndX;
    const diffY = this.touchStartY - touchEndY;
    
    // Only trigger if horizontal swipe is significant and more than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        this.nextImage();
      } else {
        this.previousImage();
      }
    }
  }

  // Prevent context menu on long press
  onContextMenu(event: Event) {
    event.preventDefault();
    return false;
  }

  // Image loading handlers
  onImageLoad() {
    this.imageLoading = false;
  }

  onImageError() {
    this.imageLoading = false;
    console.error('Failed to load image:', this.getCurrentImage()?.src);
  }

  // Progress indicator
  get progressPercentage(): number {
    if (!this.selectedProject?.images) return 0;
    return ((this.selectedImageIndex + 1) / this.selectedProject.images.length) * 100;
  }

  ngOnDestroy() {
    // Clean up body class when component is destroyed
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('modal-open');
    }
  }
}
