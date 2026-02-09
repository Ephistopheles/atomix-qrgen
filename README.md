# Atomix QRGen 📱

![Astro](https://img.shields.io/badge/Astro-5.17.1-FF5D01?logo=astro&logoColor=white)
![Preact](https://img.shields.io/badge/Preact-10.28.3-673AB8?logo=preact&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-06B6D4?logo=tailwindcss&logoColor=white)

**Atomix QRGen** is a modern, privacy-focused QR code generator built with **Astro**, **Preact**, and **Tailwind CSS**.  
Generate customizable QR codes for multiple formats including URLs, WiFi credentials, vCards, calendar events, payment information, and plain text — all fully client-side.

No tracking. No backend. No stored data.

---

## ✨ Features

- Generate QR codes for multiple formats:
  - 🔗 **URL** - Direct links to websites
  - 📝 **Text** - Plain text content
  - 📶 **WiFi** - Network credentials with encryption support
  - 👤 **vCard** - Contact information
  - 📅 **Event** - Calendar events with time and location
  - 💳 **Payment** - Payment requests
- Real-time QR code preview
- Download QR codes as images
- Form validation for each content type
- Responsive design for all devices
- 100% client-side (no server, no storage)

---

## 🧰 Prerequisites

You need:

- **Node.js** 18 or higher  
- **npm** (or any compatible Node package manager)

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/Ephistopheles/atomix-qrgen.git
cd atomix-qrgen
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```
http://localhost:4321
```

---

## 📦 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the static production site |
| `npm run preview` | Preview the production build |
| `npm run astro` | Run the Astro CLI |

---

## 🏗 Architecture

This project uses a component-based architecture powered by Astro and Preact.

```
ephistopheles-atomix-qrgen/
├── astro.config.mjs        → Astro and Preact integration config
├── package.json            → Project metadata and scripts
├── tsconfig.json           → TypeScript configuration
└── src/
    ├── pages/
    │   └── index.astro     → Main application entry point
    ├── layouts/
    │   └── RootLayout.astro → Global layout, fonts and meta
    ├── components/
    │   ├── pages/
    │   │   └── qr-code-generator.astro → Page wrapper component
    │   ├── qr-code-app/
    │   │   ├── app/
    │   │   │   └── qr-gen-app.tsx → Main app logic and state
    │   │   └── cards/
    │   │       ├── qr-types/
    │   │       │   └── card-qr-type.tsx → QR type selector
    │   │       ├── content-input-card/
    │   │       │   └── card-content-input.tsx → Dynamic form container
    │   │       └── qr-preview/
    │   │           └── card-qr-preview.tsx → QR code display & download
    │   └── forms/
    │       ├── url/
    │       │   └── url-form.tsx        → URL input form
    │       ├── text/
    │       │   └── text-form.tsx       → Plain text form
    │       ├── wifi/
    │       │   └── wifi-form.tsx       → WiFi credentials form
    │       ├── v-card-form/
    │       │   └── v-card-form.tsx     → Contact info form
    │       ├── event-form/
    │       │   └── event-form.tsx      → Calendar event form
    │       ├── payment-form/
    │       │   └── payment-form.tsx    → Payment details form
    │       └── shared/
    │           └── form-input.tsx      → Reusable input component
    ├── domain/
    │   ├── types/
    │   │   └── qr.ts             → TypeScript type definitions
    │   ├── encoders/
    │   │   └── encoders.ts       → QR data format encoders
    │   ├── validation/
    │   │   └── validators.ts     → Input validation logic
    │   ├── form/
    │   │   └── form-registry.ts  → Form component registry
    │   ├── hooks/
    │   │   └── use-form-data.ts  → Form state management hook
    │   └── ui/
    │       └── toast.ts          → Toast notification system
    └── styles/
        └── global.css            → Tailwind base styles and custom utilities
```

The QR code generator runs entirely in the browser using Preact components.  
No data is sent to any server, stored, or logged.

This makes the app fast, private, secure, and cheap to host.

---

## 🔧 Technology Stack

- **[Astro](https://astro.build)** - Static site generator with partial hydration
- **[Preact](https://preactjs.com)** - Lightweight React alternative for interactive components
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[qr-code-styling](https://github.com/kozakdenys/qr-code-styling)** - QR code generation library

---

## 🔒 Privacy & Security

- All QR code generation happens **client-side** in your browser
- No data is transmitted to external servers
- No analytics or tracking
- No cookies or local storage of sensitive data
- Perfect for generating QR codes with private information (WiFi passwords, payment details, etc.)

---

## 👤 Author

**Johan Amed**  
GitHub: https://github.com/Ephistopheles  
Email: [rjohanamed@gmail.com](mailto:rjohanamed@gmail.com)

---

## 📄 License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute it.
