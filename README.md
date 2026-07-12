# AssetFlow AI

![AssetFlow AI Banner](https://via.placeholder.com/1200x400/0f172a/3b82f6?text=AssetFlow+AI+-+Next+Gen+Enterprise+Asset+Management)

**AssetFlow AI** is a state-of-the-art, AI-powered Enterprise Asset Management platform. Built for modern organizations, it leverages intelligent predictive models to manage hardware, vehicles, and shared resources, complete with a stunning dark glassmorphic user interface.

## Features

### Intelligent AI Hub
- **Predictive Maintenance:** Client-side algorithms predict component failures before they happen, giving a "Risk Tier" and estimated days to failure.
- **Conversational Chatbot:** Natural language processing interface to query asset health, ownership, and maintenance records. (e.g., *"Show all critical health assets"*)
- **Health Scoring Engine:** Real-time calculation of asset health based on age, repair history, original cost, and utilization.

### Comprehensive Resource Management
- **Asset Registry:** Track thousands of assets across departments with real-time status updates (Available, Allocated, Under Maintenance, Retired).
- **People Directory:** Map assets to employees. View complete employee profiles including current allocations and booking histories.
- **Resource Bookings:** Interactive calendar grid to schedule shared resources like conference rooms, vehicles, and projectors without conflicts.

### Audit & Compliance
- **Audit Cycles:** Create and track department-wide compliance audits. 
- **Real-time Tracking:** Monitor missing, damaged, or mislocated items instantly.
- **QR Code Manager:** Generate, scan, and batch-print SVG/PNG QR codes for instant physical tracking.

### Admin Controls & RBAC
- **Role-Based Access Control:** Differentiated views and actions for Employees, Auditors, Asset Managers, and Admins.
- **Full CRUD:** Admins have complete control to edit profiles, force asset transfers, and permanently delete records.
- **Data Management:** "Danger Zone" controls allow for resetting all operational data (bookings, audits, maintenance) while preserving the core catalog.

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Design System:** Custom Dark Glassmorphism with CSS Variables
- **State Management:** React Context API (No external state libs required)
- **Icons:** SVG based for maximum performance

---

## Getting Started

### Prerequisites
Make sure you have Node.js 18.17.0 or newer installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/assetflow-ai.git
   cd assetflow-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser. 

*Note: The application uses a robust mock data set simulating an enterprise environment on initial load.*

---

## Project Structure

```
assetflow-ai/
├── src/
│   ├── app/                # Next.js App Router pages (Assets, AI, Audits, etc.)
│   ├── components/         # Reusable UI components (Auth, Layout, Modals)
│   ├── data/               # 100+ KB of realistic mock enterprise data
│   └── lib/                # Context API, AI algorithms, and TypeScript definitions
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration and custom animations
└── globals.css             # Glassmorphism utilities and root variables
```

---

## UI/UX Philosophy

AssetFlow AI rejects the "boring enterprise software" trope. 
- **Dynamic Interactions:** Subtle micro-animations, hover states, and smooth layout transitions encourage user engagement.
- **Deep Aesthetics:** Tailored HSL color palettes, multi-layered blurred backdrops, and gradient accents provide a premium feel.
- **Information Architecture:** Complex data is broken down into easily scannable badges, progress bars, and visual indicators.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
