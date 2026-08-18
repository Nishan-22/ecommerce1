# ShoeShop

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

- Email: `admin@shoeshop.com`
- Password: `admin123`

## License

MIT