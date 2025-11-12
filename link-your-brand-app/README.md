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

## Local development & upload testing (quick)

If you want to test the file upload flow locally (the app can store uploads in LocalStack S3 or locally), follow these steps.

1. Install dependencies and start the dev server:

```powershell
cd 'C:\Users\guste\Downloads\webpage\link-your-brand-app'
npm install
npm run dev
```

2. (Optional) Use LocalStack to emulate S3:

```powershell
# Run LocalStack with Docker (S3 API exposed at localhost:4566)
docker run --rm -it -p 4566:4566 -p 4571:4571 localstack/localstack:latest
```

3. Create a `.env.local` in the app folder if you want to enable S3 uploads (example):

```text
USE_S3=true
UPLOAD_BUCKET=linkyourbrand-uploads
S3_ENDPOINT=http://localhost:4566
S3_PUBLIC_URL=http://localhost:4566
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
```

4. Use the upload form on the homepage or curl to POST a file to `/api/upload`.

If `USE_S3=false` files will be written to `public/uploads/` instead.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
