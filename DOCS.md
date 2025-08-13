## App Overview

This project implements a minimal authentication flow in Next.js (App Router) with TypeScript and SCSS modules, using a context for client-side auth state and a simple schema-validated login form.

### Key Routes
- `/auth`: Login form with Iranian mobile validation using Zod + react-hook-form
- `/dashboard`: Protected page that welcomes the authenticated user

### Auth Model
- `app/providers.tsx` exposes an `AuthProvider` and `useAuth()` hook
- Persists a minimal `AuthUser` in `localStorage`
- `isReady` ensures UI waits until hydration reads persisted state

### Login Flow
1. User submits phone on `/auth`
2. `login()` fetches a user from `https://randomuser.me/api/?results=1&nat=us`
3. Persist user to `localStorage`, update context, and redirect to `/dashboard`

### Validation
- `lib/validation/auth.ts` defines `loginSchema` using Zod
- Iranian phone format: 11 digits starting with `09` (`/^09\d{9}$/`)

### UI Components
- `components/ui/Input.tsx`: forwardRef, error display, accessible attributes
- `components/ui/Button.tsx`: variants (`primary`, `secondary`, `link`)
- `components/ui/Spinner.tsx`: fullscreen loader for transitions/hydration

### Styling
- SCSS Modules with nested selectors for maintainable styles
- Example: `.card { .title { ... } .actions { ... } }`

### Images
- Next `Image` used on `/dashboard`; remote domain `randomuser.me` configured in `next.config.ts`

### Extensibility Ideas
- Replace random user API with a real backend
- Add JWT storage and refresh flow
- Introduce server actions for login and session cookies
- Protect server components via middleware or server-side auth checks


