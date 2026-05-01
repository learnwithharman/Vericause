<div align="center">
  <a href="https://vericause.vercel.app/" target="_blank">
    <img src="./public/logo.svg" alt="VeriCause Logo" width="160" height="160">
  </a>

  <h1>VeriCause</h1>
  <p><strong>Donation Transparency & Impact Platform</strong></p>

  <p>
    <strong>Live Link</strong>: <a href="https://vericause.vercel.app/">https://vericause.vercel.app/</a>
  </p>
</div>

## Overview
VeriCause is a modern, full-stack web application designed for transparent giving and tracking real-world impact. It provides a secure platform where NGOs can register, create fundraising campaigns, and donors can contribute to verified causes. The platform ensures transparency through a rigorous administrative verification workflow before any campaign goes live, building trust within the community.

## Core Features
- **NGO & Donor Portals:** Dedicated dashboards tailored for NGOs to manage campaigns and donors to track their contributions.
- **Campaign Marketplace:** Explore verified campaigns with details, funding goals, and progressive tracking.
- **Admin Moderation & Approval Workflow:** A comprehensive administrative dashboard for moderating NGOs and approving/rejecting new campaigns to maintain platform integrity.
- **Secure Authentication:** Robust user authentication and role-based access control.
- **Real-time Analytics:** Visual representation and analytics on funding progress.

## Tech Stack

### Frontend
- **Framework:** React 18 built with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS & shadcn/ui (Radix UI primitives)
- **Routing:** React Router v6
- **State Management & Fetching:** React Query (@tanstack/react-query)
- **Forms & Validation:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Icons & Visuals:** Lucide React, Recharts

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Security & Auth:** bcrypt, JSON Web Tokens (JWT)
- **File Handling:** Multer

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended) & npm
- PostgreSQL running locally or hosted

### Installation & Setup

1. **Install Frontend Dependencies:**
   ```sh
   npm install
   ```

2. **Install Backend Dependencies:**
   ```sh
   cd server
   npm install
   ```

3. **Environment Setup:**
   Ensure `.env` files are configured properly in the root and `server` directory with necessary variables (Database URL, JWT Secret, etc.).

4. **Initialize Database:**
   ```sh
   cd server
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start the Application:**
   Start both the backend and frontend servers:
   
   **Frontend (from root):**
   ```sh
   npm run dev
   ```
   **Backend:**
   ```sh
   cd server
   npm run dev
   ```

## Production Build

To build the optimized frontend for production:
```sh
npm run build
```

To build the backend:
```sh
cd server
npm run build
```

## Contact

- **Instagram**: [@ded.lecter](https://www.instagram.com/ded.lecter/)
