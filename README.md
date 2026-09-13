# Pokhreli Shoe Shop

![CI](https://img.shields.io/github/actions/workflow/status/Nishan-22/ecommerce1/ci.yml?branch=main&label=CI)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

A modern e-commerce web application for sneakers and footwear, built with Next.js, Tailwind CSS, and eSewa payment integration.

## Features

- Product catalog with search and product detail pages
- Shopping cart with quantity management
- User authentication (login / register / admin)
- Admin dashboard for adding products and viewing orders
- Image upload for products
- eSewa payment gateway integration (sandbox for testing)
- Dark theme with animated 3D background

## Getting Started

1. Install dependencies:

```
npm i
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the development server             |
| `npm run build`     | Create a production build                |
| `npm run start`     | Serve the production build locally       |
| `npm run lint`      | Run ESLint across the codebase           |
| `npm run typecheck` | Run the TypeScript compiler (`--noEmit`) |

## Tech Stack

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [eSewa Payment Gateway](https://developer.esewa.com.np)

## eSewa Sandbox (Test) Credentials

Use these for development/testing only. Replace with your production credentials when going live.

**Merchant (API) credentials:**
- Merchant ID / Product Code: `EPAYTEST`
- Secret Key: `8gBm/:&EnH.1/q`

**Test user login (to make payments in sandbox):**
- eSewa ID: `9806800001` (also `9806800002` - `9806800005` available)
- Password: `Nepal@123`
- OTP Token: `123456`

## Admin Login

- Email: `admin@pokhrelishoeshop.com`
- Password: `admin123`

## License

MIT