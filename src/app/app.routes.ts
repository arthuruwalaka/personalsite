import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component'; 
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { SkillsComponent } from './skills/skills.component';
import { ExtraComponent } from './extra/extra.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'projects', component: ProjectsComponent},   
    {path: 'resume', component: ResumeComponent},
    {path: 'skills', component: SkillsComponent}, 
    {path: 'extras', component: ExtraComponent},
    {path: '**', redirectTo: ''}
];
