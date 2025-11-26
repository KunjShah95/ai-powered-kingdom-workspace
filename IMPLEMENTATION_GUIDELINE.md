# AI Kingdom Council - Implementation Guideline

## 1. Project Overview

**Name:** AI Kingdom Council
**Concept:** A fantasy Himalayan kingdom-themed multi-agent council interface.
**Goal:** Build a production-ready React frontend with a premium, message-centric UX.

## 2. Tech Stack

- **Framework:** React (Vite) + TypeScript
- **Routing:** React Router v6+
- **Styling:** Tailwind CSS + Custom Theme
- **UI Library:** shadcn/ui (Radix Primitives)
- **Animations:** Framer Motion (UI), GSAP (Parallax), react-three-fiber (Optional Background)
- **Icons:** Lucide React

## 3. Project Structure

```
src/
  ├── main.tsx
  ├── App.tsx
  ├── routes/
  │   ├── LandingPage.tsx
  │   ├── SignInPage.tsx
  │   ├── SignUpPage.tsx
  │   ├── CouncilPage.tsx
  │   ├── KingdomPage.tsx
  │   ├── ChroniclesPage.tsx
  │   └── SettingsPage.tsx
  ├── components/
  │   ├── layout/
  │   │   ├── AppShell.tsx
  │   │   ├── TopNav.tsx
  │   │   ├── SidebarRoster.tsx
  │   │   └── ContextPanel.tsx
  │   ├── chat/
  │   │   ├── ChatMessage.tsx
  │   │   ├── RoyalDecreeCard.tsx
  │   │   ├── PromptSuggestions.tsx
  │   │   └── ChatInputBar.tsx
  │   ├── council/
  │   │   ├── CouncilRoleBadge.tsx
  │   │   └── AutonomySlider.tsx
  │   ├── kingdom/
  │   │   ├── KingdomStatsGrid.tsx
  │   │   ├── KingdomMap.tsx
  │   │   └── SpyNetworkList.tsx
  │   ├── chronicles/
  │   │   ├── ChronicleList.tsx
  │   │   └── ChronicleDetail.tsx
  │   ├── settings/
  │   │   ├── ThemeToggle.tsx
  │   │   ├── DensitySlider.tsx
  │   │   └── ModelVisibilityToggles.tsx
  │   └── ui/ (shadcn components)
  ├── hooks/
  │   ├── useAutonomy.ts
  │   └── useSettings.ts
  ├── styles/
  │   └── globals.css
  └── lib/
      ├── dummyData.ts
      ├── theme.ts
      └── types.ts
```

## 4. Theme System (Tailwind Configuration)

### Colors

Extend `tailwind.config.js` with:

- **Backgrounds:**
  - `bg-page`: #F9F8F5 (Parchment)
  - `bg-stone`: #EAE8E5 (Warm Stone)
- **Text:**
  - `text-primary`: #111111 (Near Black)
  - `text-muted`: #4B5563 (Charcoal/Gray)
- **Accents:**
  - `accent-brown`: #4B3621
  - `accent-teal`: #4B7B7B
  - `accent-blue`: #46818E
  - `accent-gold`: #B08D57

### Typography

- **Headings:** Playfair Display (Serif)
- **Body:** Inter (Sans-serif)

## 5. Implementation Phases

### Phase 1: Foundation & Setup

1. **Initialize Vite Project:**
    `npm create vite@latest ai-kingdom-council -- --template react-ts`
2. **Install Dependencies:**
    `npm install react-router-dom framer-motion gsap lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot`
3. **Setup Tailwind CSS:**
    - Install Tailwind & PostCSS.
    - Configure `tailwind.config.js` with the palette and fonts above.
    - Setup `globals.css` with `@tailwind` directives and base font imports.
4. **Setup Router:**
    - Configure `react-router-dom` in `App.tsx` with the defined routes.

### Phase 2: UI Library & Layouts

1. **Install shadcn/ui components:**
    - Initialize shadcn: `npx shadcn-ui@latest init`
    - Add core components: `button`, `card`, `input`, `textarea`, `tabs`, `switch`, `slider`, `avatar`, `scroll-area`.
2. **Build Layout Components:**
    - `AppShell`: The main wrapper for authenticated routes (`/app/*`). Includes responsive sidebar logic.
    - `TopNav`: Header with title and user menu.

### Phase 3: Core Features (Council Hall)

1. **Chat Interface:**
    - `ChatMessage`: Styled bubbles with Framer Motion entrance animations.
    - `RoyalDecreeCard`: Special styling for the final decision.
    - `ChatInputBar`: Fixed bottom input with auto-resize.
2. **Sidebar Roster:**
    - List of agents with mute/unmute toggles.
3. **Context Panel:**
    - Tabs for Map, Stats, and Spy Network.
    - Create dummy data in `lib/dummyData.ts` to populate these.

### Phase 4: Public & Auth Pages

1. **Landing Page:**
    - Hero section with GSAP parallax (mountains).
    - "How it works" and "Meet the Council" sections.
2. **Auth Pages:**
    - Clean, centered forms for Sign In/Up using shadcn Cards.

### Phase 5: Secondary Features

1. **Kingdom Dashboard:**
    - Grid layout of stats and charts (using dummy data).
2. **Chronicles:**
    - List view of past sessions.
3. **Settings:**
    - Theme toggles and density sliders.

### Phase 6: Polish & Optimization

1. **Animations:**
    - Ensure stagger effects on chat messages.
    - Verify GSAP parallax performance.
2. **Responsiveness:**
    - Test mobile drawer behavior for sidebars.
3. **Accessibility:**
    - Check contrast ratios and keyboard navigation.

## 6. Development Guidelines

- **Component Design:** Use functional components with typed props. Keep components small and focused.
- **State Management:** Use local state for UI (open/close) and React Context for global app state (Theme, User, Current Session).
- **Styling:** Use Tailwind utility classes. For complex conditional styling, use `cn()` (clsx + tailwind-merge).
- **Assets:** Place static images in `public/`. Use SVGs for icons (Lucide).

## 7. Next Steps

1. Execute Phase 1 (Setup).
2. Create the directory structure.
3. Begin implementing the Theme and Layouts.
