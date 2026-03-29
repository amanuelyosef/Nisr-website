# Nisr Website

Nisr Website is a React + TypeScript marketplace frontend built with Vite and Tailwind CSS. The codebase follows a layered structure inspired by clean architecture to keep domain logic, use cases, and UI concerns separated.

## Production URL

https://amanuelyosef.github.io/Nisr-website/

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- React Router
- Firebase (data source)
- Algolia (search)

## Architecture Overview

The app is organized into layers:

- domain: Entities and repository contracts.
- application: Use cases that orchestrate business operations.
- infrastructure: External integrations (Firebase, Algolia, repository implementations).
- presentation: Pages, sections, components, and hooks for UI.
- shared: Cross-cutting constants and utilities.

This helps keep UI components thin and pushes data access/logic behind repository interfaces.

## Project Structure

Key folders in src:

```text
src/
	app/
		routes.tsx
	application/
		useCases/
			getCategories.ts
			getProductDetail.ts
			getRecommendedProducts.ts
			getSellerProducts.ts
			getSellerProfile.ts
			getTrendProducts.ts
			searchProducts.ts
	domain/
		entities/
		repositories/
	infrastructure/
		algolia/
		firebase/
		repositories/
	presentation/
		components/
		features/
			home/
				sections/
					CategoriesSection/
					TrendProductsSection/
		hooks/
		pages/
			HomePage/
			ProductDetailPage/
			SearchResultsPage/
			SellerShopPage/
	shared/
		constants/
		utils/
	styles/
```

## Available Routes

Defined in src/app/routes.tsx:

- / -> Home page
- /search -> Search results
- /product/:productId -> Product detail
- /seller/:sellerId -> Seller shop

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a local env file from the example:

```bash
copy .env.example .env
```

Required variables (see .env.example):

- Firebase: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID, VITE_FIREBASE_MEASUREMENT_ID
- Algolia: VITE_ALGOLIA_APP_ID, VITE_ALGOLIA_API_KEY, VITE_ALGOLIA_INDEX

### Run in Development

```bash
npm run dev
```

App runs at http://localhost:5173/

### Build and Preview

```bash
npm run build
npm run preview
```

## Deployment

### GitHub Pages (automatic)

This repository includes .github/workflows/deploy-pages.yml.

- Trigger: push to main
- Build output: dist
- Deployment target: GitHub Pages

### Firebase Hosting (optional/manual)

firebase.json is configured to serve dist with SPA rewrites. After building, deploy with Firebase CLI if needed.

## Notes

- Vite alias @ points to src (configured in vite.config.ts).
- Build output directory is dist.
