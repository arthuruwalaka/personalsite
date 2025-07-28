import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
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
    HeaderComponent,
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
export class AppComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
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
    }
  }
}