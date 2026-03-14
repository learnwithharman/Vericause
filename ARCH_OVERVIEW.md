# Vericause System Overview: Live Edition

### 1. The Frontend (Global Dashboard & Marketplace)
The Frontend is the only part of the application that the user ever directly interacts with. For a project like Vericause, the Frontend has to be incredibly fast, beautiful, and intuitive.

Built with **React and Vite**, we didn't just write static web pages; we created a "smart blueprint" system. Instead of reloading the entire page, React only redraws the specific pieces of the screen that change. To make it production-ready, we deployed it to **Vercel**. Now, your UI isn't just on one computer; it’s distributed across a global **Edge Network (CDN)**. Whether a donor is in New York or Tokyo, the sleek **Tailwind CSS** dashboard loads in an instant, providing a seamless, native-app feel.

### 2. The APIs & Services (The Cloud Messengers)
In Vericause, we use **REST APIs** as our invisible messengers. When you click a button on the Vercel-hosted frontend, it sends a secure request to our live API base URL at **`https://vericause.onrender.com/api`**.

This system is completely **Decoupled**. Because our API messengers are "Standardized," we can eventualy build a mobile app that talks to the exact same backend engine. The "waiter" (the API) carries your data payload through the internet using **HTTPS encryption**, ensuring that sensitive donor information is never exposed during transit.

### 3. The Backend (The Render Engine)
When the API messenger arrives, it is handled by our **Node.js/Express** backend, which is live on **Render**. The Backend acts as the secure "Kitchen Manager" and the logical brain of the operation.

You can never trust the frontend alone, so our backend acts as a **Zero-Trust Gatekeeper**. Every time it receives a message, it performs a **Middleware Security Audit**—demanding an encrypted **JWT Token** to verify that the person trying to delete or edit a campaign is actually authorized. By hosting this on Render, we have a professional **CI/CD Pipeline**: every time we improve the code on GitHub, Render automatically builds a new, optimized version of the server without any downtime.

### 4. The Database (The Invincible Supabase Vault)
The final and most critical step is the permanent storage of your data. We have upgraded from a local file to **Supabase**, a professional-grade **PostgreSQL Database** hosted in the cloud.

The Database is your "Invincible Vault." We manage it using **Prisma**, which acts as a hyper-strict librarian. Before any data is saved, Prisma checks our **Master Schema** to ensure every number, date, and string is perfectly formatted. Unlike a local file that can be lost, this cloud vault is backed up, encrypted, and accessible only to our authorized Backend. Whether it's a $10 donation or a $10,000 campaign, the data is stored with "ACID Compliance," meaning it is either saved perfectly or not at all—guaranteeing 100% financial integrity for Vericause.
