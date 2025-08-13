# Authentication Flow – Next.js + TypeScript + SCSS

A minimal authentication flow built with **Next.js (App Router)**, **TypeScript**, and **SCSS Modules**, featuring schema-based form validation, reusable UI components, and client-side authentication state management.

---

## 🚀 Features

- **Two-page auth flow**
  - `/auth` – Login form with **Iranian mobile number validation**
  - `/dashboard` – Protected page showing a welcome message
- **Schema-based validation** with [Zod](https://zod.dev/) + [react-hook-form](https://react-hook-form.com/)
- **Reusable UI components** (`Input`, `Button`, `Spinner`)
- **Auth context** with `localStorage` persistence
- **SCSS Modules** with nested selectors
- **Responsive & accessible** design
- Type-safe implementation with **TypeScript**

---

## 📂 Project Structure

````bash
├── DOCS.md
├── README.md
├── app
│   ├── auth
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── dashboard
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   ├── page.tsx
│   └── providers.tsx
├── components
│   └── ui
│       ├── Button.module.scss
│       ├── Button.tsx
│       ├── Input.module.scss
│       ├── Input.tsx
│       ├── Spinner.module.scss
│       └── Spinner.tsx
├── eslint.config.mjs
├── lib
│   └── validation
│       └── auth.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── tsconfig.json
````

---

## 🔑 Authentication Flow
1. User enters phone number on `/auth`
2. Form validates: **must match** `/^09\d{9}$/` (11 digits, starting with `09`)
3. On submit:
   - Fetches random US user from `https://randomuser.me/api/?results=1&nat=us`
   - Saves user data in `localStorage` and updates context
   - Redirects to `/dashboard`
4. On `/dashboard`:
   - If no user is found in context/localStorage → Redirects back to `/auth`

---

## 🛠 Tech Stack

- **Next.js** – App Router
- **TypeScript** – Type safety
- **SCSS Modules** – Component-scoped styles with nesting
- **React Hook Form** – Form state management
- **Zod** – Schema validation
- **Context API** – Auth state management
- **Random User API** – Mock user data

---

## 📦 Installation & Running

```bash
# Clone repository
git clone https://github.com/th-mhmn/dekamod-auth-task
cd dekamod-auth-task

# Install dependencies
npm install

# Run development server
npm run dev

````
App will be available at:
➡️ http://localhost:3000


## Documentation

To learn more about this app and its structure, see `DOCS.md`.


## Authors

- [Taha Mehmandoust](https://www.github.com/th-mhmn)

