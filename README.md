# (주)후미디어 (WHO Media) — Premium B2B Media Hub Platform

> **디지털 통합 미디어 비전과 스마트 인프라를 구축하는 프리미엄 B2B 미디어 솔루션 웹 플랫폼**

---

## 📌 Project Overview

**(주)후미디어 (WHO Media)** 웹 플랫폼은 기업, 공공기관 및 교육기관을 위한 올인원 디지털 미디어 비즈니스 허브입니다.
시네마틱 4K 미디어 제작 역량, 스마트 평생교육원 인프라(후캠퍼스), 그리고 미디어 에이전시 네트워크를 유기적으로 융합한 B2B 맞춤형 인터랙티브 웹 솔루션을 제공합니다.

### Key Capabilities
- **Hero Video Section**: GPU 하드웨어 가속 4K 시네마틱 영상 배경 및 노이즈 캔슬링 아티팩트 마스크 필터 적용.
- **3D Corporate Showcase Slider**: 마우스 움직임에 반응하는 3D 틸트 스포트라이트, 카메라 셔터 리포커싱 애니메이션, 모바일 터치 스와이프 제스처 지원.
- **Interactive Work Process Timeline**: 4단계 B2B 과업 수행 프로세스를 시각화하는 동적 타임라인 및 GSAP 세부 정보 전환.
- **YouTube Portfolio Grid & Modal Player**: YouTube oEmbed API 자동 제목 동기화, 카테고리별 필터링, 풀스크린 비디오 팝업 모달.
- **B2B Ecosystem Hub Flip Cards**: 3D 카드 뒤집기 인터랙션으로 서비스 분야별 세부 사양 정보 제공.
- **Cybernetic AI Text Decode Animation**: 섹션 헤드라인 진입 시 일그러짐에서 선명한 한국어 타이포그래피로 디코딩되는 사이버네틱 애니메이션.

---

## 🛠️ Technology Stack

| Architecture Layer | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | React 19 / Pure TypeScript (Vite Single Page Architecture) |
| **Build Tool & Server** | Vite 6, TSX, Node.js |
| **Styling Engine** | Tailwind CSS v4, Custom CSS Animations |
| **Motion & FX Engine** | GSAP 3.12 (CDN), CSS 3D Perspective Transforms |
| **API & Embeds** | YouTube oEmbed API (`noembed.com`), YouTube IFrame Player API |
| **Type Checking & Linting** | TypeScript 5.8 (`tsc --noEmit`) |

---

## 📁 Repository Directory Structure

```
├── .env.example              # Environment Variable Template
├── index.html                # Main HTML Document & Semantic Layout Structure
├── package.json              # NPM Dependencies & Build Scripts
├── tsconfig.json             # TypeScript Compiler Configuration
├── vite.config.ts            # Vite Bundler Setup
├── README.md                 # Developer Onboarding & Architecture Guide
└── src/
    ├── main.ts               # Primary Application Bootstrap Entry Point
    ├── main.tsx              # React Mount Entry Point
    ├── App.tsx               # Top-level Component Structure
    ├── index.css             # Global Tailwind Styles, Custom Cursor & Responsive Rules
    ├── types.ts              # Centralized TypeScript Interfaces & Data Models
    ├── data/                 # Static Dataset Modules
    │   ├── aboutPillars.ts   # Corporate Philosophy Pillar Records
    │   └── processData.ts    # B2B Process Step Specifications
    └── modules/              # Modular Single-Purpose Feature Controllers
        ├── aiTextDecode.ts   # Cybernetic Headline Scramble / Decode Controller
        ├── aboutSlider.ts    # 3D Tilt Showcase, Touch Swiper & Shutter FX
        ├── contactForm.ts    # B2B Inquiry Form Validation & Toast Notification
        ├── customCursor.ts   # Video Production Camera Pointer & Click Shockwave FX
        ├── flipCards.ts      # 3D B2B Hub Card Flip Toggle Controller
        ├── globalScroll.ts   # Mobile & Desktop Native Scroll Enabler
        ├── mobileMenu.ts     # Mobile Drawer Menu & Scroll-Lock Controller
        ├── navigation.ts     # Smooth Anchor Navigation & IntersectionObserver Highlighting
        ├── portfolioModal.ts # YouTube oEmbed Fetcher, Category Filter & Video Modal
        └── processTimeline.ts# Process Stepper Timeline & GSAP Detail Fader
```

---

## 🚀 Local Setup & Development Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **NPM**: `v9.0.0` or higher

### Installation Steps

1. **Clone the Repository & Navigate to Root:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Project Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` or `.env` file in the root directory based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   *Required variables:*
   ```env
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   APP_URL="http://localhost:3000"
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```
   The local dev server binds to `http://localhost:3000`.

5. **Build for Production:**
   ```bash
   npm run build
   ```
   Outputs production-ready static assets in the `dist/` directory.

6. **Run Type Checker & Linter:**
   ```bash
   npm run lint
   ```

---

## 🔐 Environment Variables Reference

| Variable Name | Required | Description |
| :--- | :---: | :--- |
| `GEMINI_API_KEY` | Optional | API Key for Gemini AI services (server-side proxying) |
| `APP_URL` | Required | Public domain URL for OAuth redirects and self-referential links |

---

## 💡 Developer Maintainer Guidelines

1. **Single Responsibility Principle**:
   Keep feature logic localized in `/src/modules/`. Avoid putting UI event listener logic directly into `main.ts`.

2. **Passive Touch Events for Scroll Performance**:
   Always attach `{ passive: true }` to `touchstart`, `touchend`, and `mousemove` listeners to prevent blocking native mobile touch scrolling.

3. **JSDoc Documentation Standard**:
   Ensure all major exported functions and custom data interfaces include complete JSDoc annotations detailing parameter types, return values, and implementation intent.
