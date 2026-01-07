# Portfolio Website — Museum-Like Design

A thoughtful, editorial portfolio website showcasing UX/interaction design work with a quiet, intentional aesthetic inspired by curated exhibitions.

## 🎨 Design Philosophy

This site feels less like a tech product and more like a curated design exhibition. Motion and visuals support meaning, not distract from it.

### Key Principles
- **Editorial aesthetic**: Museum-like, quiet, intentional
- **Generous whitespace**: Large margins, breathing room
- **Slow, intentional motion**: Ease-in-out only, no bounce
- **Content hierarchy**: Through spacing and size, not weight

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Welcome/Threshold page
├── hero.html               # Hero/Intent page  
├── work.html               # Work index with project cards
├── case-hear-me.html       # Hear Me case study
├── case-perk-up.html       # Perk Up case study (template)
├── case-flutter-archive.html # Flutter Archive case study (template)
├── ongoing-anansi.html     # Anansi's Web ongoing work
├── about.html              # About page with portrait
├── resume.html             # Resume page with PDF embed
├── contact.html            # Contact page
├── style.css               # Global design system
├── src/
│   ├── navigation.js       # Page transitions & scroll animations
│   └── case-study.css      # Case study page styles
└── assets/                 # Images, PDFs, media
    ├── portrait.jpg        # Your portrait (for About page)
    ├── resume.pdf          # Your resume PDF
    ├── hear-me-preview.jpg # Project preview images
    ├── perk-up-preview.jpg
    ├── flutter-preview.jpg
    └── anansi-preview.jpg
```

## 🎯 Pages Overview

### 1. Welcome (index.html)
- Threshold page with slow fade-in
- Short introductory text
- Single "Enter" button

### 2. Hero (hero.html)
- Main landing page after entry
- Headline communicating design philosophy
- Primary CTA to work, secondary to about

### 3. Work Index (work.html)
- Curated project cards
- 3 main case studies + 1 ongoing work
- Alternating layouts for visual rhythm

### 4. Case Studies
Each case study follows this structure:
- Project header (role, timeline, tools)
- TL;DR section
- Problem/Intent
- Users & Context
- Key Insight (highlighted callout)
- Process (expandable sections)
- Interaction/System Design
- Design Decisions & Tradeoffs
- Outcome & Impact
- Reflection & Next Steps

### 5. Ongoing Work: Anansi
- Project overview and purpose
- Current iteration (physical card game)
- Future roadmap (web → app)
- What it demonstrates as a designer

### 6. About
- Museum-framed portrait
- Narrative bio
- Design philosophy
- Current focus (grad school/jobs)

### 7. Resume
- Embedded PDF viewer
- Download option

### 8. Contact
- Email and LinkedIn
- Optional message form (needs backend configuration)

## 🎨 Design System

### Color Palette
```css
--color-bg-primary: #F8F6F1      /* Off-white / Warm Ivory */
--color-bg-secondary: #E8E6E0    /* Light stone gray */
--color-text-primary: #2B2B2B    /* Charcoal */
--color-text-secondary: #6B6B6B  /* Warm gray */
--color-accent: #9B8B7E          /* Muted bronze */
```

### Typography
- **Headings**: Playfair Display (serif, editorial)
- **Body/UI**: Inter (clean sans-serif)

### Motion
- Slow, intentional transitions (800ms cubic-bezier)
- Fade-in on scroll for progressive disclosure
- No bounce, elastic, or jarring movements

## 🚀 Getting Started

### Installation
```bash
cd portfolio-website
npm install
```

### Development
```bash
npm run dev
```

Visit `http://localhost:5173` to see the site.

### Production Build
```bash
npm run build
```

## 📸 Adding Your Content

### Images
Place your images in the `assets/` folder:

1. **Portrait**: `assets/portrait.jpg` (3:4 aspect ratio recommended)
2. **Resume**: `assets/resume.pdf`
3. **Project previews**: 
   - `assets/hear-me-preview.jpg`
   - `assets/perk-up-preview.jpg`
   - `assets/flutter-preview.jpg`
   - `assets/anansi-preview.jpg`

### Case Study Content
- Edit `case-hear-me.html` with your actual Hear Me project details
- Create similar case studies for Perk Up and Flutter Archive
- Add diagrams, screenshots, and process images as needed

### Personal Information
Update these files with your information:
- `about.html`: Your bio, philosophy, interests
- `contact.html`: Your email and LinkedIn URLs
- `resume.html`: Your resume PDF path

## ✨ Key Features

### Navigation
- Smooth page transitions
- Fixed navigation (appears after welcome screen)
- Keyboard accessible

### Scroll Animations
- Elements fade in as they enter viewport
- Staggered delays for visual hierarchy
- Respects `prefers-reduced-motion`

### Expandable Process Sections
- Case studies use `<details>` elements
- Click to expand/collapse process phases
- Smooth animations

### Responsive Design
- Mobile and tablet friendly
- Typography scales down gracefully
- Grid layouts adapt to screen size

## 🎯 SEO Best Practices
- Semantic HTML5 structure
- Meta descriptions on every page
- Proper heading hierarchy (single H1 per page)
- Alt text for images
- Fast load times (optimized assets)

## 📝 Customization Tips

### Changing Colors
Edit CSS variables in `style.css`:
```css
:root {
  --color-bg-primary: #YOURCOLOR;
  --color-accent: #YOURCOLOR;
}
```

### Adjusting Motion Speed
```css
:root {
  --transition-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Adding More Projects
1. Create a new case study HTML file
2. Use `case-hear-me.html` as a template
3. Add a project card in `work.html`
4. Link everything together

## 🌐 Deployment

This is a static site that can be deployed to:
- **Netlify**: Drag & drop the folder
- **Vercel**: Connect your Git repo
- **GitHub Pages**: Push to `gh-pages` branch
- **Custom hosting**: Upload the built files

## 📬 Form Configuration

The contact form needs a backend service. Options:
- [Formspree](https://formspree.io/) (easiest)
- [Netlify Forms](https://www.netlify.com/products/forms/) (if using Netlify)
- Custom backend (Node.js, PHP, etc.)

Update the form action in `contact.html`:
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

## 🎨 Design Credits

- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Design System**: Custom, museum-inspired aesthetic
- **Grain Texture**: SVG noise filter

## 📄 License

This template is provided as-is for personal portfolio use. Customize it to make it your own!

---

**Note**: This is a starting framework. The real magic happens when you fill it with your unique work, voice, and perspective. Make it yours.
