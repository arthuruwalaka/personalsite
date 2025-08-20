# Project Images Setup Guide

## How to Add Your Project Images

### 1. Image Directory Structure

Your images should be placed in the following directories:

```
src/assets/images/
├── portfolio/
│   ├── homepage.png
│   ├── mobile.png
│   └── wireframe.png
├── twitter/
│   ├── search.png
│   └── results.png
├── calendar/
│   ├── dashboard.png
│   └── scheduling.png
├── habits/
│   ├── main.png
│   └── tracking.png
└── uniye/
    ├── collaboration.png
    └── learning.png
```

### 2. Image Requirements

- **Format**: PNG, JPG, or WebP recommended
- **Size**: Keep under 2MB for fast loading
- **Dimensions**: 1200x800px or similar aspect ratio works best
- **Quality**: High quality, clear screenshots/wireframes

### 3. How It Works

- Click "View Images" button on any project card
- Modal opens with your project images
- Navigate between images with arrow buttons
- Click outside modal or X button to close

### 4. Customizing Images

To change which images appear for each project, edit the `projects` array in:
`src/app/projects/projects.component.ts`

### 5. Adding New Projects

1. Add your images to the appropriate folder
2. Update the `projects` array in the component
3. Add the project card to the HTML template

## Benefits of This Approach

✅ **No external dependencies** - Images stored locally
✅ **Fast loading** - No external API calls
✅ **Professional appearance** - Clean modal interface
✅ **Mobile-friendly** - Responsive design
✅ **Easy to manage** - Simple file structure
