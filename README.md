<div align="center">

# 🦅 Nisr Market

### The Modern Peer-to-Peer Marketplace for Ethiopia

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-nisrmarket.com-2ea44f?style=for-the-badge)](https://www.nisrmarket.com)
[![Made at AASTU](https://img.shields.io/badge/Made_at-AASTU-blue?style=for-the-badge)](https://www.aastu.edu.et/)

<br />

![React](https://img.shields.io/badge/React-19.2.1-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.6-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Algolia](https://img.shields.io/badge/Algolia-5.46-5468FF?style=flat-square&logo=algolia&logoColor=white)

<br />

<p align="center">
  <strong>Buy and sell anything in Ethiopia.</strong><br />
  A browse-first web experience that showcases products, categories, trending items, and seller shops.
</p>

[View Live Site](https://www.nisrmarket.com) · [Report Bug](mailto:nisrmarket@gmail.com) · [Request Feature](mailto:nisrmarket@gmail.com)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 🎯 About The Project

**Nisr Market** is an Ethiopian peer-to-peer (P2P) online marketplace designed to connect buyers and sellers across the country. This repository contains the **web front-end** — a responsive, browse-only experience that showcases the marketplace while directing users to the full-featured Android app for transactions.

### User Flows

| Flow | Description |
|:-----|:------------|
| 🏠 **Browse** | Explore trending and recommended products on the home page |
| 🔍 **Search** | Find products by keyword, category, condition, or price range |
| 📦 **Product Details** | View detailed product information and seller profiles |
| 🏪 **Seller Shops** | Visit individual seller storefronts |
| 📱 **Get the App** | Download the Android app for the full experience |

> 💰 All prices displayed in **ETB (Ethiopian Birr)**

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🛍️ Product Discovery
- Smart category browsing
- Full-text search powered by Algolia
- Advanced filtering (price, condition, delivery)
- Multiple sorting options

</td>
<td width="50%">

### 🎨 Modern UI/UX
- Responsive design for all devices
- Lazy-loaded images with skeleton states
- Infinite scroll pagination
- Smooth animations

</td>
</tr>
<tr>
<td width="50%">

### 🏪 Seller Profiles
- Dedicated seller shop pages
- Product galleries
- Seller activity information

</td>
<td width="50%">

### ⚡ Performance
- Vite-powered fast builds
- Code splitting
- Race condition protection
- Stale response handling

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
<br>React 19
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
<br>Vite
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br>Tailwind v4
</td>
<td align="center" width="96">
<img src="https://skillicons.dev/icons?i=firebase" width="48" height="48" alt="Firebase" />
<br>Firebase
</td>
<td align="center" width="96">
<img src="https://cdn.simpleicons.org/algolia" width="48" height="48" alt="Algolia" />
<br>Algolia


</td>
</tr>
</table>

### Additional Libraries

| Category | Libraries |
|:---------|:----------|
| **UI Components** | Radix UI, Lucide Icons |
| **Styling** | clsx, tailwind-merge, class-variance-authority |
| **Routing** | React Router v6 |
| **Analytics** | Google Analytics |
| **Security** | Cloudflare Turnstile |

---

## 🏗️ Architecture

The project follows **Clean Architecture** principles with four distinct layers:

| Layers | Functionalities |
|:---------|:----------|
| **📱 Presentation** | React pages · Sections · Custom hooks |
| **⚙️ Application** | Use-case functions |
| **🔌 Infrastructure** | Firebase & Algolia repos + clients |
| **💎 Domain** | Pure TypeScript types & interfaces |



**Dependency Rule:** Each layer imports only from the layer beneath it. Pages never call Firestore or Algolia directly.
```
Page Component
└── Custom Hook (presentation/hooks)
└── Use Case (application/useCases)
└── Repository (infrastructure/repositories)
└── Firebase SDK / Algolia SDK
```


---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 9

### Installation

```
# Clone the repository
git clone https://github.com/amanuelyosef/Nisr-website.git
cd Nisr-website

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Firebase and Algolia credentials

# Start development server
npm run dev

```
The app will be available at http://localhost:5173

**Available Scripts**

|Command	|Description
|:---------|:----------|
npm run dev|	Start development server with HMR
npm run build	| Build for production
npm run preview|	Preview production build locally
npx tsc --noEmit|	Run TypeScript type checking

### 🔐 Environment Variables

Create a .env file in the root directory with the following variables:

```

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Algolia Configuration
VITE_ALGOLIA_APP_ID=your_algolia_app_id
VITE_ALGOLIA_API_KEY=your_search_only_api_key
VITE_ALGOLIA_INDEX=your_index_name
```


📁 Project Structure
```

Nisr-website/
├── 📄 index.html                 # HTML shell with analytics
├── 📄 vite.config.ts             # Vite configuration
├── 📄 firebase.json              # Firebase Hosting config
│
├── 📁 .github/workflows/         # CI/CD pipelines
│   └── deploy-pages.yml
│
├── 📁 public/                    # Static assets
│
└── 📁 src/
    ├── 📄 index.tsx              # App entry point
    │
    ├── 📁 app/                   # App routing
    │   └── routes.tsx
    │
    ├── 📁 domain/                # 💎 Domain Layer
    │   ├── entities/             # Business entities
    │   └── repositories/         # Repository interfaces
    │
    ├── 📁 application/           # ⚙️ Application Layer
    │   └── useCases/             # Business logic
    │
    ├── 📁 infrastructure/        # 🔌 Infrastructure Layer
    │   ├── algolia/              # Algolia client
    │   ├── firebase/             # Firebase client
    │   └── repositories/         # Repository implementations
    │
    ├── 📁 presentation/          # 📱 Presentation Layer
    │   ├── pages/                # Route pages
    │   ├── features/             # Feature-specific components
    │   ├── components/           # Shared UI components
    │   └── hooks/                # Custom React hooks
    │
    ├── 📁 shared/                # Shared utilities
    │   ├── constants/
    │   └── utils/
    │
    └── 📁 assets/                # Images and media
```
## 🌐 Deployment
### GitHub Pages (Automated)
Every push to main automatically triggers deployment via GitHub Actions.

### Firebase Hosting (Manual)

```
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

Build Output

```
npm run build      # → dist/
npm run preview    # Serve at http://localhost:4173
```

### 📍 Roadmap
```
 🔐 User authentication UI
 🤖 Integrate Cloudflare Turnstile for bot protection
 💬 In-app chat functionality
 📂 Dedicated category routes
 🚫 404 error page
 💾 Client-side data caching
 📱 Dynamic APK version info
 ```

## 🤝 Contributing
Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

### Code Quality
- TypeScript strict mode enabled
- Follow existing architecture patterns
- Use the cn() utility for conditional classes
- Implement effect cancellation in async hooks

### 📬 Contact
<div align="center">
📧 Email: nisrmarket@gmail.com

🌐 Website: www.nisrmarket.com

<sub>Made ❤️ at AASTU · Addis Ababa, Ethiopia</sub>

</div> ```
