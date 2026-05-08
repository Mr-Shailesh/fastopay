# FastoPay

FastoPay is a Next.js TypeScript application for a business payment platform. It includes a marketing landing page, local authentication flow, protected dashboard, profile editing, and product browsing with API-backed product details.

## Features

- Responsive landing page with Hero, Features, Demo, About, Pricing, and Contact sections
- Smooth in-page navigation without adding hash fragments to the URL
- Login and registration screens with shared form controls and animated auth messaging
- LocalStorage-backed demo authentication with hashed passwords
- Protected dashboard and profile page
- Product listing with infinite scroll and hover image carousel
- Product detail page with image gallery and API-loaded product metadata
- Contact form using Formik validation
- Privacy Policy, Terms of Service, and Refund/Cancellation policy pages

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Formik and Yup
- Axios with request/response interceptors
- Framer Motion
- Lucide React icons

## Project Structure

```text
app/                    Next.js app routes
components/auth/         Login/register UI
components/common/       Shared form controls and toast
components/home/         Landing page sections
components/layout/       Header and footer
components/products/     Product card UI
components/profile/      Profile form
hooks/                   Auth/protected-route hooks and constants
lib/api/                 Axios client and product API helpers
lib/auth/                Local auth/token utilities
lib/validation/          Yup schemas
public/                  Logo and demo images
types/                   Shared TypeScript interfaces
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open the app at:

```text
http://localhost:3000
```

## Available Scripts

```bash
pnpm dev      # Start local development server
pnpm build    # Create production build
pnpm start    # Start production server
```

## Environment Variables

The product API defaults to:

```text
https://api.freeapi.app/api/v1/public
```

To override it, add:

```bash
NEXT_PUBLIC_API_URL="https://your-api-url.example.com"
```

## Authentication Notes

This project uses client-side demo authentication:

- Registered users are stored in `localStorage`
- Passwords are hashed with SHA-256 before storage
- Current session tokens are also stored in `localStorage`
- Protected pages redirect unauthenticated users to `/auth/login`

This is suitable for demo/local development only. Production authentication should use a secure backend, server-issued tokens, and proper session management.

## Product API

Products are loaded through `lib/api/products.ts`, which uses the shared Axios client from `lib/api/client.ts`.

The Axios client adds the stored access token to requests and handles `401` responses by clearing the local session and redirecting to login.

## Verification

Type-check the project:

```bash
./node_modules/.bin/tsc --noEmit
```

Build for production:

```bash
pnpm build
```
