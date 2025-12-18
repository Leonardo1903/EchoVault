# EchoVault 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v18%2B-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

> **One-liner pitch:** Anonymous feedback platform with AI-powered suggestions, secure NextAuth authentication, and real-time message management.

---

![App Screenshot](./public/Echovault.png)

---

## 🧐 About The Project

**EchoVault** is a modern anonymous feedback platform that fosters open and honest communication. It allows anyone to send and receive anonymous messages, enhanced with AI-generated suggestions to promote constructive dialogue. Built for security, privacy, and a seamless user experience, from secure sign-on to a personalized feedback dashboard.

**Key Features:**
* ✅ **True Anonymity:** Send feedback to any registered user without needing to sign up yourself.
* ✅ **AI-Powered Suggestions:** Intelligent, context-aware message suggestions from Google Gemini to help start conversations.
* ✅ **Secure Authentication:** Robust and secure user registration and login system powered by NextAuth.
* ✅ **Personal Feedback Dashboard:** Private, personalized dashboard for registered users to view and manage all received messages.
* ✅ **Full Message Control:** Users have complete control to view, manage, and delete the messages they receive.


## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| **Authentication** | NextAuth.js (credential-based), Zod validation |
| **Database** | MongoDB (Atlas) with Mongoose ODM |
| **AI & Suggestions** | Google Gemini API |
| **Email Service** | Resend |
| **UI & UX** | Lucide React icons, Sonner toasts |
| **Tooling** | ESLint, Prettier, npm scripts |

---

## 📚 Engineering Docs

Comprehensive documentation is available in the `/docs` folder:
* **[PRD.md](./docs/PRD.md)** - Product Requirements Document with user stories, personas, and success metrics
* **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture, tech stack decisions, and database schema
* **[API.md](./docs/API.md)** - API surface and response formats
* **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment, env vars, and operations guide

**Key Code Entry Points:**
* **API routes:** `src/app/api/*` (auth, messages, users, verification)
* **Schemas:** `src/schemas/*` (Zod validation schemas)
* **UI:** Components in `src/components/*` (Navbar, Footer, MessageCard, etc.)
* **Types:** Centralized in `src/types/*`
* **Database Models:** `src/models/*` (User model with Mongoose)

---

## ⚡ Quick Start

**1) Clone the repo**
```bash
git clone https://github.com/Leonardo1903/EchoVault.git
cd EchoVault
```

**2) Install dependencies**
```bash
npm install
```

**3) Set up environment variables**
```bash
cp .env.sample .env.local
# then fill in your MongoDB URI, NextAuth Secret, Gemini API Key, Resend API Key, and app URL
```

**4) Run the development server**
```bash
npm run dev
```
Visit http://localhost:3000

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.
1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push to the branch: `git push origin feature/amazing`
5. Open a Pull Request

---

## 👤 Author

Leonardo Fernandes
- GitHub: [@Leonardo1903](https://github.com/Leonardo1903)
- LinkedIn: [leonardofernandes1903](https://www.linkedin.com/in/leonardofernandes1903/)

---

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.
