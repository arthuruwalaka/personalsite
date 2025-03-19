import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // constructor(private route: ActivatedRoute) {}

  // ngAfterViewInit() {
  //   this.route.fragment.subscribe(fragment => {
  //     if (fragment) {
  //       document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   });
  // }

}
