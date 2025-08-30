# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `bun dev` - Start development server with hot reload on port 3009
- `bun start` - Run production server
- `bun run build` - Build for production using custom build.ts script

### Build Options (via build.ts)
The custom build script supports multiple flags:
- `--watch` - Enable file watching
- `--minify` - Minify output
- `--sourcemap` - Generate sourcemaps
- `--hot` - Enable hot module replacement
- `--echo` - Echo console messages
- `--dev` - Development mode (combines watch, sourcemap, hot, echo)

## Architecture Overview

This is a React-based GSAP slider gallery application built with Bun as the runtime. The project demonstrates advanced animation techniques using GSAP with React integration.

### Tech Stack
- **Runtime**: Bun (package manager and bundler)
- **Framework**: React 19 with TypeScript
- **Routing**: React Router 7.8.2 with declarative routing
- **Animation**: GSAP 3.13 with @gsap/react hooks
- **Styling**: Tailwind CSS 4.x with custom dark theme
- **Build**: Custom Bun build script with plugin system

### Core Components

#### GsapGallery (src/components/GsapGallery.tsx)
The main slider implementation featuring:
- Horizontal infinite loop with seamless scrolling
- Draggable interaction with InertiaPlugin for momentum
- Auto-play with hover pause
- Click-to-navigate functionality
- Responsive design with automatic resizing
- Complex horizontal loop algorithm using GSAP's horizontalLoop utility

Key implementation details:
- Uses `useGSAP` hook for proper React lifecycle integration
- Implements xPercent-based positioning for responsiveness
- Handles both touch and mouse interactions
- Maintains center-focused active element state

#### DemoCard (src/components/DemoCard.tsx)
Individual slider card component with gradient styling and glass-morphism effects.

### Page Structure

#### Home Page (src/pages/Home.tsx)
Landing page with navigation cards featuring:
- Styled navigation links to main application sections
- Glass-morphism card design with hover effects
- Responsive grid layout with gradient backgrounds

#### Sliders Page (src/pages/Sliders.tsx)
Gallery comparison page containing:
- GSAP Gallery with horizontal infinite scrolling
- Embla Gallery with carousel navigation
- Back navigation to home page

#### ScrollAnimation Page (src/pages/ScrollAnimation.tsx)
Scroll-triggered animation showcase featuring:
- Fade-in animations on viewport enter
- Text reveal animations with staggered timing
- Parallax background effects using ScrollTrigger
- Reverse animations when leaving viewport

### Key Patterns

1. **GSAP Integration**: Always use `useGSAP` hook for animations, not direct gsap calls
2. **React Router**: Use declarative routing with `BrowserRouter`, `Routes`, and `Route` components
3. **TypeScript**: Strict mode enabled - ensure all types are properly defined
4. **Imports**: Use `@/*` alias for src directory imports
5. **Styling**: Tailwind utilities preferred, custom colors: `#fbf0df` (light gold), `#f3d5a3` (dark gold)

### Server Setup

The application runs as a full-stack Bun app:
- Entry point: `src/index.tsx` (server)
- Frontend: `src/frontend.tsx` (React DOM)
- Router setup: `src/App.tsx` (React Router configuration)
- API routes available via the server for future expansion

### Routing Structure

The application uses React Router for client-side navigation:
- `/` - Home page with navigation cards
- `/sliders` - Gallery comparison page with GSAP and Embla sliders  
- `/scroll-animation` - Scroll-triggered animation demonstrations

### Development Notes

- The GSAP horizontal loop implementation is complex and handles edge cases for infinite scrolling
- Draggable functionality includes snap points and inertia calculations
- Build process uses a custom Tailwind plugin for Bun compatibility
- Hot reload is configured for rapid development