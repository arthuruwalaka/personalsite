import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ResumeComponent } from './resume/resume.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    AboutComponent,
    ResumeComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
/**
 * The AppComponent class is the root component of the Angular application.
 * 
 * It implements the AfterViewInit lifecycle hook to perform actions after the component's view has been fully initialized.
 * 
 * The constructor injects the PLATFORM_ID token, which allows the component to determine whether it is running in the browser or on the server (useful for Angular Universal / SSR).
 * 
 * In the ngAfterViewInit method, the code checks if the current platform is the browser using isPlatformBrowser.
 * If so, it selects all anchor (<a>) elements whose href attribute starts with "#" (i.e., in-page anchor links).
 * For each such anchor, it adds a click event listener that:
 *   - Prevents the default browser behavior (which would jump directly to the anchor).
 *   - Extracts the target element's ID from the href attribute.
 *   - If the target element exists, it scrolls smoothly to that element using scrollIntoView with smooth behavior.
 * 
 * This provides a smooth scrolling effect for in-page navigation links, but only when running in the browser (not during server-side rendering).
 */
export class AppComponent implements AfterViewInit, OnDestroy {
  private scrollListener?: () => void;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title
  ) {
    // Set the page title
    this.titleService.setTitle('Arthur Uwalaka - Software Engineer');
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
          const targetId = href?.substring(1);
          if (targetId) {
            document.getElementById(targetId)?.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });

      // Active section detection
      this.scrollListener = () => {
        this.updateActiveSection();
      };
      window.addEventListener('scroll', this.scrollListener);
      this.updateActiveSection(); // Initial call

      // Scroll-triggered animations
      this.setupScrollAnimations();
    }
  }

  ngOnDestroy() {
    if (this.scrollListener && isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    console.log('Setting up animations for', sections.length, 'sections');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('Section intersecting:', entry.target.id, entry.isIntersecting);
        
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          console.log('Added animate-in class to:', entry.target.id);
          
          // Handle page-specific animations
          this.animatePageElements(entry.target.id, true);
        } else {
          entry.target.classList.remove('animate-in');
          console.log('Removed animate-in class from:', entry.target.id);
          
          // Reset page-specific animations
          this.animatePageElements(entry.target.id, false);
        }
      });
    }, {
      threshold: 0.2, // Trigger when 20% of section is visible
      rootMargin: '0px 0px -100px 0px' // Start animation earlier
    });

    sections.forEach(section => {
      console.log('Observing section:', section.id);
      observer.observe(section);
    });
  }

  private animatePageElements(sectionId: string, isAnimatingIn: boolean) {
    switch (sectionId) {
      case 'about':
        this.animateAboutPageCards(isAnimatingIn);
        break;
      case 'skills':
        this.animateSkillsPage(isAnimatingIn);
        break;
      case 'projects':
        this.animateProjectsPage(isAnimatingIn);
        break;
      case 'resume':
        this.animateResumePage(isAnimatingIn);
        break;
      case 'contact':
        this.animateContactPage(isAnimatingIn);
        break;
      // Add more cases for other pages as needed
    }
  }

  private animateAboutPageCards(isAnimatingIn: boolean) {
    const mainCard = document.querySelector('.about-main-card');
    const leftCard = document.querySelector('.about-left-card');
    const rightCard = document.querySelector('.about-right-card');
    
    if (isAnimatingIn) {
      // Animate in sequence
      if (mainCard) {
        setTimeout(() => {
          mainCard.classList.add('animate-in');
        }, 200);
      }

      if (leftCard) {
        setTimeout(() => {
          leftCard.classList.add('animate-in');
        }, 600);
      }
      
      if (rightCard) {
        setTimeout(() => {
          rightCard.classList.add('animate-in');
        }, 600);
      }
    } else {
      // Reset all cards
      if (mainCard) mainCard.classList.remove('animate-in');
      if (leftCard) leftCard.classList.remove('animate-in');
      if (rightCard) rightCard.classList.remove('animate-in');
    }
  }

  private animateSkillsPage(isAnimatingIn: boolean) {
    // Placeholder for skills page animations
    console.log('Skills page animation:', isAnimatingIn);
  }

  private animateProjectsPage(isAnimatingIn: boolean) {
    if (isAnimatingIn) {
      // Animate the projects grid container
      const projectsGrid = document.querySelector('#projects .grid');
      if (projectsGrid) {
        setTimeout(() => {
          projectsGrid.classList.add('animate-in');
        }, 200);
      }
    } else {
      // Reset projects grid
      const projectsGrid = document.querySelector('#projects .grid');
      if (projectsGrid) {
        projectsGrid.classList.remove('animate-in');
      }
    }
  }

  private animateResumePage(isAnimatingIn: boolean) {
    if (isAnimatingIn) {
      // Animate resume sections in sequence with longer delays
      const experienceSection = document.querySelector('#resume .space-y-12 > div:first-child');
      const educationSection = document.querySelector('#resume .space-y-12 > div:last-child');
      const downloadSection = document.querySelector('#resume .mt-12');
      
      if (experienceSection) {
        setTimeout(() => {
          experienceSection.classList.add('animate-in');
        }, 150);
      }
      
      if (educationSection) {
        setTimeout(() => {
          educationSection.classList.add('animate-in');
        }, 600);
      }
      
      if (downloadSection) {
        setTimeout(() => {
          downloadSection.classList.add('animate-in');
        }, 1050);
      }
    } else {
      // Reset resume sections
      const resumeSections = document.querySelectorAll('#resume .space-y-12 > div, #resume .mt-12');
      resumeSections.forEach(section => {
        section.classList.remove('animate-in');
      });
    }
  }

  private animateContactPage(isAnimatingIn: boolean) {
    if (isAnimatingIn) {
      // Animate contact sections in sequence
      const titleSection = document.querySelector('#contact h3');
      const subtitleSection = document.querySelector('#contact p');
      const formSection = document.querySelector('#contact form');
      const socialSection = document.querySelector('#contact .mt-12');
      
      if (titleSection) {
        setTimeout(() => {
          titleSection.classList.add('animate-in');
        }, 100);
      }
      
      if (subtitleSection) {
        setTimeout(() => {
          subtitleSection.classList.add('animate-in');
        }, 200);
      }
      
      if (formSection) {
        setTimeout(() => {
          formSection.classList.add('animate-in');
        }, 400);
      }
      
      if (socialSection) {
        setTimeout(() => {
          socialSection.classList.add('animate-in');
        }, 600);
      }
    } else {
      // Reset contact sections
      const contactSections = document.querySelectorAll('#contact h3, #contact p, #contact form, #contact .mt-12');
      contactSections.forEach(section => {
        section.classList.remove('animate-in');
      });
    }
  }

  private updateActiveSection() {
    const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact'];
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    let activeSection = 'home';
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;
        
        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          activeSection = sectionId;
        }
      }
    });

    // Update active dot (both desktop and mobile)
    document.querySelectorAll('.nav-dot, .mobile-nav-dot').forEach(dot => {
      dot.classList.remove('active');
    });
    
    const activeDots = document.querySelectorAll(`[data-section="${activeSection}"]`);
    activeDots.forEach(dot => {
      dot.classList.add('active');
    });
  }
}