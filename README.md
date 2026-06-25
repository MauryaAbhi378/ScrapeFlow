This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## FlowScrape - Billing System

This project includes a complete billing and credit management system powered by Stripe.

### 🎯 Features

- **Credit Balance Display** - Real-time credit balance tracking
- **Stripe Integration** - Secure payment processing via Stripe Checkout
- **Three Credit Packs** - Small (1K), Medium (5K), Large (10K) credits
- **Usage Analytics** - Recharts visualization of daily credit consumption
- **Automated Fulfillment** - Webhook-based credit addition
- **Success Notifications** - Toast messages for payment status

### 📍 Routes

- `/billing` - Main billing page
- `/api/webhooks/stripe` - Stripe webhook endpoint

### 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Stripe**
   - Create a Stripe account
   - Add your keys to `.env.local`:
     ```env
     STRIPE_SECRET_KEY=sk_test_...
     STRIPE_WEBHOOK_SECRET=whsec_...
     NEXT_PUBLIC_STRIPE_SMALL_PACK_PRICE_ID=price_...
     NEXT_PUBLIC_STRIPE_MEDIUM_PACK_PRICE_ID=price_...
     NEXT_PUBLIC_STRIPE_LARGE_PACK_PRICE_ID=price_...
     ```

3. **Set Up Webhook Forwarding** (for local testing)
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. **Start the Dev Server**
   ```bash
   npm run dev
   ```

5. **Visit the Billing Page**
   ```
   http://localhost:3000/billing
   ```

6. **Test with Stripe Test Card**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits

### 📚 Documentation

Complete documentation is available in these files:

- **[BILLING_DOCS_INDEX.md](./BILLING_DOCS_INDEX.md)** - Documentation index and navigation
- **[BILLING_QUICKSTART.md](./BILLING_QUICKSTART.md)** - Quick start guide (5 minutes)
- **[STRIPE_SETUP.md](./STRIPE_SETUP.md)** - Detailed Stripe setup instructions
- **[BILLING_IMPLEMENTATION.md](./BILLING_IMPLEMENTATION.md)** - Technical implementation details
- **[BILLING_FLOW.md](./BILLING_FLOW.md)** - Architecture and data flow
- **[BILLING_UI_GUIDE.md](./BILLING_UI_GUIDE.md)** - UI/UX design guide
- **[BILLING_DEPLOYMENT_CHECKLIST.md](./BILLING_DEPLOYMENT_CHECKLIST.md)** - Production deployment checklist
- **[BILLING_SUMMARY.md](./BILLING_SUMMARY.md)** - High-level overview

### 🏗️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Payments:** Stripe Checkout & Webhooks
- **Database:** Prisma + SQLite
- **Charts:** Recharts
- **UI:** Tailwind CSS, Lucide Icons
- **Auth:** Clerk
- **Notifications:** Sonner

### 📂 Project Structure

```
app/(dashboard)/billing/
├── page.tsx                              # Main billing page
├── actions/                              # Server actions
│   ├── getCreditsAction.ts
│   ├── getCreditUsageAction.ts
│   └── createStripeCheckoutAction.ts
└── components/                           # UI components
    ├── AvailableCreditsCard.tsx
    ├── PurchaseCreditsCard.tsx
    ├── CreditsConsumedChart.tsx
    └── BillingNotifications.tsx

app/api/webhooks/stripe/
└── route.ts                              # Stripe webhook handler
```

### 🧪 Testing

```bash
# Run the test with Stripe test card
# Card: 4242 4242 4242 4242
# Complete checkout and verify credits are added
```

### 🚀 Production Deployment

Before deploying to production:

1. Switch to live Stripe keys (not test keys)
2. Create live products in Stripe Dashboard
3. Set up production webhook endpoint
4. Update environment variables
5. Use the [deployment checklist](./BILLING_DEPLOYMENT_CHECKLIST.md)

### 💳 Credit Packs

| Pack   | Credits | Price  |
|--------|---------|--------|
| Small  | 1,000   | $9.99  |
| Medium | 5,000   | $39.99 |
| Large  | 10,000  | $69.99 |

### 📊 Database

The billing system uses two main tables:

- **UserBalance** - Stores user credit balances
- **ExecutionPhase** - Tracks credit consumption for analytics

### 🆘 Need Help?

Start with the **[BILLING_QUICKSTART.md](./BILLING_QUICKSTART.md)** for immediate setup, or browse the **[BILLING_DOCS_INDEX.md](./BILLING_DOCS_INDEX.md)** for complete documentation.

---
