# Arthur Uwalaka - Personal Portfolio Website

A modern, minimalist personal portfolio website built with Angular and Tailwind CSS. Inspired by magazine and newspaper layouts, this site showcases my skills, projects, and professional experience with a clean, mobile-first design approach.

## 🌐 Live Demo

[View Live Site](https://personalsite-blond-iota.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: Angular 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Email Service**: EmailJS
- **Deployment**: Vercel
- **Version Control**: Git, GitHub

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arthuruwalaka/personalsite.git
   cd personalsite
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create environment files
   cp src/environments/environment.ts.example src/environments/environment.ts
   cp src/environments/environment.prod.ts.example src/environments/environment.prod.ts

   # Add your EmailJS credentials to environment files
   ```

4. **Start development server**

   ```bash
   ng serve
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200/`

## 📁 Project Structure

```
src/
├── app/
│   ├── about/           # About section component
│   ├── contact/         # Contact form component
│   ├── home/            # Home page with typing animation
│   ├── projects/        # Projects showcase component
│   ├── resume/          # Resume/experience component
│   ├── skills/          # Skills section component
│   └── app.component.ts # Main app component with animations
├── environments/        # Environment configuration
├── styles.scss         # Global styles and animations
└── index.html          # Main HTML file
```

## 🎨 Design Philosophy

This portfolio follows a **magazine-inspired, minimalist design** with:

- **Typography**: Clean, readable fonts with proper hierarchy
- **Color Palette**: Muted, pastel colors for a professional look
- **Spacing**: Generous whitespace for better readability
- **Mobile-First**: Responsive design that works on all devices
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🚀 Deployment

The site is automatically deployed to Vercel on every push to the main branch.

### Manual Deployment

```bash
# Build for production
ng build --configuration production

# Deploy to Vercel
vercel --prod
```

## 🔧 Environment Variables

Set up the following environment variables in your Vercel dashboard:

- `EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `EMAILJS_TEMPLATE_ID`: Your EmailJS template ID
- `EMAILJS_PUBLIC_KEY`: Your EmailJS public key

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Features Explained

### Typing Animation

The home page features a dynamic typing effect that cycles through different professional titles, creating an engaging first impression.

### Image Modal System

Projects include a sophisticated image modal with:

- Full-screen viewing
- Zoom and pan controls
- Touch/mouse gesture support
- Mobile-optimized controls

### Scroll Animations

Sections animate into view as users scroll, creating a smooth, engaging experience.

### Contact Form

Integrated with EmailJS for seamless contact form functionality without backend requirements.

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to:

- Open an issue for bugs or suggestions
- Fork the repository for your own use
- Share feedback on design or functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

_Built with ❤️ using Angular and Tailwind CSS_
