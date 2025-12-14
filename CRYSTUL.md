
## Project Overview

Crystul is a comprehensive team collaboration and startup ecosystem built with Next.js 14, designed to connect entrepreneurs, professionals, and investors. The platform features team formation, project collaboration, fundraising capabilities, and professional networking. It utilizes a modern tech stack including Next.js 14, TypeScript, and Tailwind CSS for the frontend, with Firebase for authentication and real-time features.

## Development Commands

### Core Commands
```bash
# Development server (runs on port 3000 by default)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Environment Setup

1. Copy `.env.template` to `.env.local`
2. Update the following required environment variables:
   ```
   # Authentication
   NEXTAUTH_SECRET=your-secret-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Database
   MONGODB_URI=your-mongodb-uri
   
   # Firebase (for authentication and storage)
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

## Architecture Overview

## Architecture Overview

### Tech Stack

- **Frontend**: 
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS with shadcn/ui components
  - Radix UI Primitives
  - React Hook Form with Zod validation

### Data Layer

- **Authentication & Real-time**: Firebase Authentication
- **Database**: MongoDB with Mongoose ODM
- **State Management**: React Context API and custom hooks
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with CSS Modules
- **UI Components**: shadcn/ui with Radix UI primitives

### Key Features

- **Authentication**: Email/Password and OAuth (Google) with NextAuth.js
- **Team Management**: Create and manage teams with role-based access
- **Project Collaboration**: Task management and team communication
- **Professional Networking**: Connect with other professionals
- **Fundraising**: Tools for startups to raise funding
- **AI Assistant**: Integrated AI assistance for team collaboration

### State Management

The app uses **Zustand** (`lib/store.ts`) with persistence middleware for client-side state management. The store manages:
- Authentication state (synced with NextAuth sessions)
- Teams, messages, tasks
- User matching algorithm (compatibility scoring based on skills, interests, experience)

**Important**: The Zustand store operates client-side alongside server-side database operations. When making changes, ensure synchronization between client state and backend APIs.

### Authentication Flow

**NextAuth.js** handles authentication with two providers:
1. **Google OAuth** - Primary authentication method
2. **Credentials** - Email/password fallback

**Dev Mode Behavior**: If MongoDB is unavailable in development (placeholder credentials), the auth system allows demo login for local testing without database dependency.

**Location**: `app/api/auth/[...nextauth]/route.ts`

### Directory Structure

```
app/
├── api/                  # API routes
│   ├── auth/            # Authentication endpoints
│   └── ...
├── auth/                # Authentication pages
├── create/              # Project/team creation flows
├── explore/             # Discover projects and professionals
├── fund-raiser/         # Fundraising features
├── home/                # Landing page and dashboard
├── profile/             # User profiles
├── settings/            # User settings
├── teams/               # Team management
└── ...

components/             # Reusable UI components
lib/                    # Utility functions and hooks
models/                 # Database models
public/                 # Static assets
```

**Common Pattern**: All authenticated routes:
1. Check session via `getServerSession(authOptions)`
2. Connect to MongoDB via `dbConnect()`
3. Handle graceful degradation if DB unavailable in dev mode

### Key Dependencies

#### Core
- `next`: 14.2.3
- `react`: 18.2.0
- `typescript`: 5.2.2
- `tailwindcss`: 3.3.3

#### Data & State
- `mongoose`: 8.17.0
- `next-auth`: 4.24.11
- `zod`: 3.23.8
- `zustand`: 5.0.7

#### UI Components
- `@radix-ui/*`: Various Radix UI primitives
- `class-variance-authority`: 0.7.0
- `clsx`: 2.1.1
- `lucide-react`: 0.446.0
- `sonner`: 1.7.4 (Toast notifications)

#### Forms & Validation
- `@hookform/resolvers`: 3.9.0
- `react-hook-form`: 7.53.0
- `zod`: 3.23.8

**Important**: Models use MongoDB's `_id` field. Convert to string when passing to client: `user._id.toString()`

### Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see Environment Setup section)
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

The application is configured for deployment on Vercel. For other platforms, ensure the following:

1. Set up all required environment variables
2. Build the application:
   ```bash
   npm run build
   ```
3. Start the production server:
   ```bash
   npm start
   ```

### Contributing

1. Create a new branch for your feature/fix
2. Make your changes
3. Run the linter:
   ```bash
   npm run lint
   ```
4. Submit a pull request

### License

This project is licensed under the MIT License.

**Email Flow**: Connection requests automatically trigger email notifications with reply-to set to the sender's email.

### Component Architecture

- **UI Components**: shadcn/ui components in `components/ui/` (DO NOT edit directly - regenerate via CLI)
- **Feature Components**: `components/` root contains app-specific components
- **Auth Components**: `components/auth/` for login/register flows
- **Navbar Components**: `components/navbar-components/` for navigation elements

**Styling**: Tailwind CSS with custom theme configured in `tailwind.config.ts`. Uses CSS variables for theming.

### Path Aliases

Configured in `tsconfig.json` and `components.json`:
```typescript
@/components  → components/
@/lib         → lib/
@/models      → models/
@/hooks       → hooks/
@/app         → app/
```

## Environment Variables

### Required Variables

See `.env.template` for complete list. Critical variables:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=<generated-secret>

# Google OAuth
GOOGLE_CLIENT_ID=<from-google-cloud-console>
GOOGLE_CLIENT_SECRET=<from-google-cloud-console>

# Firebase (all NEXT_PUBLIC_ prefixed)
NEXT_PUBLIC_FIREBASE_API_KEY=<firebase-config>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<project>.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<project>.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<app-id>

# MongoDB
MONGODB_URI=mongodb+srv://...

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<email>
SMTP_PASS=<password-or-app-password>
SMTP_FROM=<from-email>  # Optional, defaults to SMTP_USER
```

### Environment Validation

`lib/env-validation.ts` validates all required variables on startup. In development mode:
- Placeholder values trigger warnings but don't block startup
- Missing variables in production throw errors
- Use `getRequiredEnvVar()` to access validated env vars

## Key Configuration Files

### next.config.js
- **ESLint and TypeScript errors ignored during builds** - useful for rapid development but should be addressed before production
- **Image optimization disabled** - using `unoptimized: true`

### tsconfig.json
- Strict mode disabled for faster development
- Path aliases configured for clean imports

## Development Practices

### Working with Database Models

When modifying or adding models:
1. Update the Mongoose schema in `models/`
2. Update the TypeScript interface in `lib/store.ts` if used in client state
3. Ensure `mongoose.models.<ModelName> || mongoose.model()` pattern to prevent recompilation errors

### Adding New API Routes

Standard pattern for authenticated routes:
```typescript
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  
  const dbConnection = await dbConnect();
  if (!dbConnection) {
    return NextResponse.json({ success: false, message: "DB error" }, { status: 500 });
  }
  
  // Your logic here
}
```

### Firebase vs MongoDB Decision Guide

Use **Firebase** for:
- Real-time user presence
- File uploads (Storage)
- Authentication flows
- Real-time collaborative features

Use **MongoDB** for:
- User profiles and relationships
- Team data and permissions
- Message history and persistence
- Tasks and structured data
- Complex queries and aggregations

## Testing

Currently, the project does not have a formal test suite configured. When adding tests:
- Use the test framework of your choice (Jest, Vitest)
- Focus on API route testing and data model validation
- Consider E2E tests for authentication flows

## Deployment Notes

### Production Environment

When deploying to production (Vercel/Netlify):
1. Set all environment variables in platform dashboard (never commit `.env.local`)
2. Update `NEXTAUTH_URL` to production domain
3. Update Google OAuth redirect URIs in Google Cloud Console to include production domain
4. Update Firebase authorized domains to include production domain
5. Use production MongoDB cluster
6. Configure SMTP for production email notifications

### Known Issues

- **NEXTAUTH redirect issue**: Older deployments may redirect to `unicorntank.netlify.app`. See `PRODUCTION-ENV.md` for resolution steps.
- **Build warnings**: TypeScript and ESLint checks are disabled in `next.config.js`. Address before production.

## Codebase Conventions

- **Component Naming**: PascalCase for components, kebab-case for file names
- **API Response Format**: Always return `{ success: boolean, message?: string, data?: any }`
- **Error Handling**: Log errors with `console.error()` and return appropriate HTTP status codes
- **Database Connections**: Always check for null connection in dev mode with placeholder credentials
- **Type Safety**: TypeScript interfaces defined alongside Mongoose schemas for consistency

## Port Configuration

Default development port is **3001** (not standard 3000). This is configured in `NEXTAUTH_URL` and should be maintained for consistency with OAuth callbacks.
