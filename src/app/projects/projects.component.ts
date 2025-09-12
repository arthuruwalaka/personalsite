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
  
  // Zoom functionality
  zoomLevel = 1;
  isZoomed = false;
  panX = 0;
  panY = 0;
  initialDistance = 0;
  initialZoom = 1;

  // Fullscreen state
  isFullscreen = false;

  // Scroll arrow visibility
  showArrow = true;

  projects: Project[] = [
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
        { src: 'assets/images/habits/boot_screen.png', alt: 'Boot Screen', caption: 'App Boot Screen' },
        { src: 'assets/images/habits/feed.png', alt: 'Feed', caption: 'Habit Feed' },
        { src: 'assets/images/habits/add_habit.png', alt: 'Add Habit', caption: 'Add New Habit' },
        { src: 'assets/images/habits/edit_habit.png', alt: 'Edit Habit', caption: 'Edit Existing Habit' },
        { src: 'assets/images/habits/habit_details.png', alt: 'Habit Details', caption: 'Habit Details View' },
        { src: 'assets/images/habits/all_habits.png', alt: 'All Habits', caption: 'All Habits Overview' },
        
        
        { src: 'assets/images/habits/habit_details_2.png', alt: 'Habit Details 2', caption: 'Additional Habit Details' },
        { src: 'assets/images/habits/today.png', alt: 'Today', caption: 'Today\'s Habits' },
        { src: 'assets/images/habits/today_nohabits.png', alt: 'Today No Habits', caption: 'No Habits for Today' },
        { src: 'assets/images/habits/user_page_final.png', alt: 'User Page', caption: 'User Profile Page' },
        { src: 'assets/images/habits/flow.png', alt: 'Flow', caption: 'User Flow' },
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
    
    // Reset zoom and pan state immediately
    this.resetZoom();
    this.imageElement = null; // Reset cached element
    
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
    this.resetZoom();
    this.imageElement = null; // Reset cached element
    
    // Restore background scrolling and exit fullscreen
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('modal-open');
      
      // Exit fullscreen if active
      if (this.isFullscreen) {
        this.exitFullscreen();
      }
    }
  }

  nextImage() {
    if (this.selectedProject?.images) {
      this.imageLoading = true; // Show loading for next image
      this.selectedImageIndex = (this.selectedImageIndex + 1) % this.selectedProject.images.length;
      this.resetZoom(); // Reset zoom when changing images
      this.imageElement = null; // Reset cached element
    }
  }

  previousImage() {
    if (this.selectedProject?.images) {
      this.imageLoading = true; // Show loading for previous image
      this.selectedImageIndex = this.selectedImageIndex === 0 
        ? this.selectedProject.images.length - 1 
        : this.selectedImageIndex - 1;
      this.resetZoom(); // Reset zoom when changing images
      this.imageElement = null; // Reset cached element
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

  // Mouse panning for desktop
  isMouseDown = false;
  mouseStartX = 0;
  mouseStartY = 0;
  private imageElement: HTMLImageElement | null = null;

  onMouseDown(event: MouseEvent) {
    if (!this.isZoomed) return;
    
    this.isMouseDown = true;
    this.mouseStartX = event.clientX - this.panX;
    this.mouseStartY = event.clientY - this.panY;
    event.preventDefault();
    
    // Cache image element for direct manipulation
    if (!this.imageElement) {
      this.imageElement = event.target as HTMLImageElement;
    }
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown || !this.isZoomed) return;
    
    const newPanX = event.clientX - this.mouseStartX;
    const newPanY = event.clientY - this.mouseStartY;
    
    // Update transform directly for smooth performance
    this.updateImageTransform(newPanX, newPanY);
    event.preventDefault();
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  // Global mouse move listener for panning
  @HostListener('document:mousemove', ['$event'])
  onGlobalMouseMove(event: MouseEvent) {
    if (this.isMouseDown && this.isZoomed) {
      const newPanX = event.clientX - this.mouseStartX;
      const newPanY = event.clientY - this.mouseStartY;
      this.updateImageTransform(newPanX, newPanY);
    }
  }

  @HostListener('document:mouseup')
  onGlobalMouseUp() {
    this.isMouseDown = false;
  }

  // Direct DOM manipulation for smooth transforms
  private animationFrameId: number | null = null;
  
  private updateImageTransform(panX: number, panY: number) {
    this.panX = panX;
    this.panY = panY;
    
    // Use requestAnimationFrame for smoother updates
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    this.animationFrameId = requestAnimationFrame(() => {
      if (this.imageElement) {
        const transform = `scale(${this.zoomLevel}) translate(${panX}px, ${panY}px)`;
        this.imageElement.style.transform = transform;
      }
      this.animationFrameId = null;
    });
  }

  // Touch gesture handling
  onTouchStart(event: TouchEvent) {
    event.preventDefault(); // Prevent default touch behavior
    event.stopPropagation(); // Stop event bubbling
    
    // Cache image element for direct manipulation
    if (!this.imageElement) {
      this.imageElement = (event.currentTarget as HTMLElement)?.querySelector('img') as HTMLImageElement;
    }
    
    if (event.touches.length === 1) {
      // Single touch - start panning
      this.touchStartX = event.touches[0].clientX - this.panX;
      this.touchStartY = event.touches[0].clientY - this.panY;
    } else if (event.touches.length === 2) {
      // Two touches - start pinch to zoom
      this.initialDistance = this.getDistance(event.touches[0], event.touches[1]);
      this.initialZoom = this.zoomLevel;
    }
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault(); // Prevent background scrolling
    event.stopPropagation(); // Stop event bubbling
    
    if (event.touches.length === 1 && this.isZoomed) {
      // Single touch panning when zoomed - use direct transform
      const newPanX = event.touches[0].clientX - this.touchStartX;
      const newPanY = event.touches[0].clientY - this.touchStartY;
      this.updateImageTransform(newPanX, newPanY);
    } else if (event.touches.length === 2) {
      // Two touches - pinch to zoom
      const currentDistance = this.getDistance(event.touches[0], event.touches[1]);
      const scale = currentDistance / this.initialDistance;
      const newZoomLevel = Math.max(0.5, Math.min(this.initialZoom * scale, 4));
      
      this.zoomLevel = newZoomLevel;
      this.isZoomed = this.zoomLevel > 1;
      
      // Update transform with new zoom level
      if (this.imageElement) {
        const transform = `scale(${this.zoomLevel}) translate(${this.panX}px, ${this.panY}px)`;
        this.imageElement.style.transform = transform;
      }
    }
  }

  onTouchEnd(event: TouchEvent) {
    event.preventDefault(); // Prevent default touch behavior
    event.stopPropagation(); // Stop event bubbling
    
    if (event.touches.length === 0) {
      // Check if this was a swipe gesture (not zoom/pan)
      if (!this.isZoomed && this.initialDistance === 0) {
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
      
      // Reset touch state
      this.initialDistance = 0;
      this.initialZoom = 1;
    }
  }

  // Helper method to calculate distance between two touch points
  private getDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Zoom methods
  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel * 1.5, 4);
    this.isZoomed = this.zoomLevel > 1;
    this.updateImageTransform(this.panX, this.panY);
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel / 1.5, 0.5);
    this.isZoomed = this.zoomLevel > 1;
    this.updateImageTransform(this.panX, this.panY);
  }

  resetZoom() {
    this.zoomLevel = 1;
    this.isZoomed = false;
    this.panX = 0;
    this.panY = 0;
    
    // Force reset the image transform immediately
    if (this.imageElement) {
      this.imageElement.style.transform = 'scale(1) translate(0px, 0px)';
    }
  }



  // Prevent context menu on long press
  onContextMenu(event: Event) {
    event.preventDefault();
    return false;
  }

  // Fullscreen methods for mobile
  toggleFullscreen() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isFullscreen) {
        this.exitFullscreen();
      } else {
        this.enterFullscreen();
      }
    }
  }

  private enterFullscreen() {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.documentElement;
      
      if (element.requestFullscreen) {
        element.requestFullscreen().then(() => {
          this.isFullscreen = true;
        }).catch(err => {
          console.log('Fullscreen request failed:', err);
        });
      } else if ((element as any).webkitRequestFullscreen) {
        // Safari
        (element as any).webkitRequestFullscreen();
        this.isFullscreen = true;
      } else if ((element as any).msRequestFullscreen) {
        // IE/Edge
        (element as any).msRequestFullscreen();
        this.isFullscreen = true;
      }
    }
  }

  private exitFullscreen() {
    if (isPlatformBrowser(this.platformId)) {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          this.isFullscreen = false;
        }).catch(err => {
          console.log('Exit fullscreen failed:', err);
        });
      } else if ((document as any).webkitExitFullscreen) {
        // Safari
        (document as any).webkitExitFullscreen();
        this.isFullscreen = false;
      } else if ((document as any).msExitFullscreen) {
        // IE/Edge
        (document as any).msExitFullscreen();
        this.isFullscreen = false;
      }
    }
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

  // Image orientation detection
  getImageOrientationClass(): string {
    const image = this.getCurrentImage();
    if (!image) return '';
    
    // Create a temporary image to check dimensions
    const img = new Image();
    img.src = image.src;
    
    // Default to square if we can't determine
    return 'square';
  }

  // Better image sizing based on orientation with zoom support
  getImageStyle(): any {
    const image = this.getCurrentImage();
    if (!image) return {};
    
    const baseStyles = {
      'max-width': '100%',
      'max-height': '100%',
      'object-fit': 'contain'
    };
    
    // Only add cursor when zoomed (transform handled directly via DOM)
    if (this.isZoomed) {
      return {
        ...baseStyles,
        cursor: this.isMouseDown ? 'grabbing' : 'grab'
      };
    }
    
    return baseStyles;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    this.showArrow = scrollTop === 0;
  }

  ngOnDestroy() {
    // Clean up body class when component is destroyed
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('modal-open');
    }
    
    // Clean up animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
