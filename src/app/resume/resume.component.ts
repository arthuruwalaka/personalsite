import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  expandedJobs: boolean[] = [false, false, false];

  toggleJobDetails(index: number): void {
    this.expandedJobs[index] = !this.expandedJobs[index];
  }

  downloadResume(): void {
    // Create a link element
    const link = document.createElement('a');
    link.href = 'assets/documents/ArthurUwalaka-Resume.pdf';
    link.download = 'ArthurUwalaka-Resume.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
