# Tier-Based Event Showcase

A responsive web application that displays events based on user membership tiers using Next.js 14, Clerk authentication, and Supabase database.

## Live Demo

[https://tier-event-showcase-9f7w.vercel.app/](https://tier-event-showcase-9f7w.vercel.app/)

## Features

- � **Authentication**: Secure login/signup with Clerk
- 🎯 **Tier-Based Access**: Events filtered by user tier (Free, Silver, Gold, Platinum)
- �📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🗄️ **Database**: PostgreSQL with Supabase
- ⚡ **Performance**: Built with Next.js 14 App Router
- 🔒 **Security**: Row-level security with Supabase RLS

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Authentication**: Clerk.dev
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- Clerk account ([https://clerk.com](https://clerk.com))
- Supabase account ([https://supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shreyanshtri26/tier-event-showcase.git
   cd tier-event-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Clerk and Supabase credentials in `.env.local`

4. **Set up Supabase database**
   - Create a new project in Supabase
   - Run the SQL commands from the setup guide to create tables and seed data
   - Enable Row Level Security (RLS)

5. **Configure Clerk**
   - Create a new application in Clerk
   - Set up sign-in/sign-up pages
   - Configure redirect URLs

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## Demo User Credentials

After setting up the application, you can create test users with different tiers:

- **Free Tier**: Any new user (default)
- **Silver Tier**: Upgrade via the dashboard
- **Gold Tier**: Upgrade via the dashboard
- **Platinum Tier**: Upgrade via the dashboard

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard with events
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx      # Sign in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx      # Sign up page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/
│   ├── EventCard.tsx         # Event display component
│   ├── ErrorMessage.tsx      # Error handling component
│   ├── LoadingSpinner.tsx    # Loading state component
│   └── TierUpgrade.tsx       # Tier upgrade component
├── lib/
│   ├── supabase.ts           # Supabase client and utilities
│   └── utils.ts              # Utility functions
└── middleware.ts             # Clerk authentication middleware
```

## Database Schema

### Events Table

```sql
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT NOT NULL,
  tier tier_enum NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Environment Variables

Required environment variables:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Features Implemented

### Core Requirements

- ✅ Clerk authentication integration
- ✅ Tier-based event filtering
- ✅ Supabase database with events table
- ✅ Responsive design with Tailwind CSS
- ✅ Event cards with all required information

### Bonus Features

- ✅ Loading states and error handling
- ✅ Tier upgrade simulation
- ✅ "Upgrade to access" messaging
- ✅ Row-level security implementation
- ✅ Mobile-responsive design
- ✅ Accessible UI components
