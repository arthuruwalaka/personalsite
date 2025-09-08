import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: string;
  progress: number;
  category: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills: Skill[] = [
    // Programming Languages
    { name: 'Python', level: 'Advanced', progress: 90, category: 'Programming Languages' },
    { name: 'JavaScript', level: 'Advanced', progress: 80, category: 'Programming Languages' },
    { name: 'Java', level: 'Intermediate', progress: 70, category: 'Programming Languages' },
    { name: 'TypeScript', level: 'Intermediate', progress: 70, category: 'Programming Languages' },
    { name: 'C', level: 'Intermediate', progress: 60, category: 'Programming Languages' },
    
    // Web Development
    { name: 'React', level: 'Advanced', progress: 80, category: 'Web Development' },
    { name: 'Angular', level: 'Intermediate', progress: 70, category: 'Web Development' },
    { name: 'Node.js', level: 'Intermediate', progress: 70, category: 'Web Development' },
    { name: 'Django', level: 'Advanced', progress: 80, category: 'Web Development' },
    { name: 'HTML', level: 'Advanced', progress: 85, category: 'Web Development' },
    { name: 'SCSS/CSS', level: 'Advanced', progress: 80, category: 'Web Development' },
    { name: 'Tailwind CSS', level: 'Intermediate', progress: 70, category: 'Web Development' },
    
    // Databases
    { name: 'MySQL', level: 'Advanced', progress: 90, category: 'Databases' },
    { name: 'SQLite', level: 'Intermediate', progress: 70, category: 'Databases' },
    { name: 'PostgreSQL', level: 'Intermediate', progress: 70, category: 'Databases' },
    { name: 'Firebase', level: 'Advanced', progress: 80, category: 'Databases' },
    
    // Tools/Platforms
    { name: 'Docker', level: 'Intermediate', progress: 70, category: 'Tools/Platforms' },
    { name: 'Git', level: 'Advanced', progress: 90, category: 'Tools/Platforms' },
    { name: 'AWS', level: 'Intermediate', progress: 70, category: 'Tools/Platforms' },
    { name: 'Linux', level: 'Advanced', progress: 80, category: 'Tools/Platforms' },
    { name: 'REST', level: 'Advanced', progress: 80, category: 'Tools/Platforms' },
    { name: 'PyTorch', level: 'Intermediate', progress: 70, category: 'Tools/Platforms' },
    
    // DevOps/CI/CD
    { name: 'DevOps', level: 'Intermediate', progress: 70, category: 'DevOps/CI/CD' },
    { name: 'CI/CD pipelines', level: 'Advanced', progress: 80, category: 'DevOps/CI/CD' }
  ];




  get skillsByCategory() {
    const grouped = this.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
    
    return Object.entries(grouped);
  }
}
