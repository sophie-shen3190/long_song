# Love Song Project

A Next.js application with Supabase integration.

## Environment Variables

The following environment variables need to be configured:

```env
OPENAI_API_KEY=your-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

## Deployment on Vercel

1. Fork this repository to your GitHub account
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Configure the following environment variables in Vercel:
   - OPENAI_API_KEY
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
5. Deploy!
