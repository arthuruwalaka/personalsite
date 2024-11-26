import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component'; 
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { SkillsComponent } from './skills/skills.component';
import path from 'path';
export const routes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: '', component: HomeComponent},
    {path: 'projects', component: ProjectsComponent},   
    {path: 'resume', component: ResumeComponent},
    {path: 'skills', component: SkillsComponent}, 
    {path: '**', redirectTo: ''}
];
