# Deployment & Operations Guide

| Project | **Last Updated** | **Node Version** | **Package Manager** |
| :--- | :--- | :--- | :--- |
| EchoVault | December 18, 2025 | v18.17.0+ (LTS) | npm |

---

## 1. Prerequisites
Before you begin, ensure you have the following installed locally:
* **Node.js:** v18.17.0 or higher (LTS recommended)
* **npm:** v9+ (bundled with Node LTS)
* **Git:** For cloning the repository
* **MongoDB CLI (optional):** For direct database access

**Cloud Services Required:**
* **MongoDB Atlas Account:** For database ([mongodb.com](https://www.mongodb.com))
* **Resend Account:** For email delivery ([resend.com](https://resend.com))
* **Google AI Studio Account:** For Gemini API key ([aistudio.google.com](https://aistudio.google.com))
* **Vercel Account:** (Recommended) For production deployment ([vercel.com](https://vercel.com))

---

## 2. Environment Variables
Create a `.env.local` file in the root directory. You can copy the template:

```bash
cp .env.sample .env.local
```

**Required Variables:**

| Variable | Description | Example |
| :--- | :--- | :--- |
| **NextAuth** |
| `NEXTAUTH_SECRET` | Secret key for signing NextAuth JWT/session | `super-secret-key` |
| **Database** |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/echovault` |
| **AI (Gemini)** |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| **Email (Resend)** |
| `RESEND_API_KEY` | Resend API key for sending emails | `re_...` |
| **App** |
| `NEXT_PUBLIC_APP_URL` | Base URL of the app | `http://localhost:3000` (dev) or `https://echovault.leonardo1903.me` (prod) |

---

## 3. Local Development Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/Leonardo1903/EchoVault.git
cd EchoVault
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
1. Copy `.env.sample` to `.env.local`
2. Fill in `MONGODB_URI`, `NEXTAUTH_SECRET`, `GEMINI_API_KEY`, `RESEND_API_KEY`, and `NEXT_PUBLIC_APP_URL`

### Step 4: Start the Development Server
```bash
npm run dev
```

**Access Points:**
- **Frontend:** http://localhost:3000
- **API Routes:** http://localhost:3000/api/*

### Step 5: Verify Setup
1. Open http://localhost:3000
2. Sign up a test user and complete email verification
3. Send a test anonymous message to your profile URL (`/u/[username]`)
4. Confirm messages appear in the dashboard

---

## 4. Database Management

MongoDB Atlas is managed; no migrations are required. Common tasks:

### Connect via MongoDB Shell
```bash
mongosh "your-mongodb-uri"
```

### Backup Database (logical dump)
```bash
mongodump --uri="your-mongodb-uri" --archive=backup_$(date +%Y%m%d).gz --gzip
```

### Restore Database (development only)
```bash
mongorestore --uri="your-mongodb-uri" --archive=backup_20251218.gz --gzip
```

---

## 5. Production Deployment

### Deploying to Vercel (Recommended)
Vercel provides zero-config deployment for Next.js with HTTPS, CDN, and serverless functions.

#### Step 1: Prepare for Deployment
1. Ensure all environment variables are set
2. Run linting and production build locally:
```bash
npm run lint
npm run build
```

#### Step 2: Deploy to Vercel

**Option A: GitHub Integration (Recommended)**
1. Push code to GitHub
2. In Vercel, click **Add New Project** and import the repo
3. Framework Preset: **Next.js**
4. Build Command: `npm run build`
5. Output Directory: `.next`
6. Install Command: `npm install`
7. Add environment variables from `.env.local` (use production values)
8. Deploy

**Option B: Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Step 3: Configure Custom Domain (Optional)
1. In Vercel project settings, add your custom domain
2. Update DNS as instructed
3. Set `NEXT_PUBLIC_APP_URL` to the new domain

#### Step 4: Enable Automatic Deployments
- **Production:** Push to `main` → deploys automatically
- **Preview:** Pull requests → preview deployments with unique URLs

---

## 6. Alternative Deployment Platforms

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Enable Next.js runtime support

### Self-Hosted (Docker)
Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t echovault .
docker run -p 3000:3000 --env-file .env.local echovault
```

---

## 7. Post-Deployment Checklist
- [ ] **Auth:** Sign up/in works with email verification
- [ ] **Messages:** Send/receive anonymous messages via `/u/[username]`
- [ ] **AI Suggestions:** `/api/suggest-messages` returns suggestions
- [ ] **Email:** Verification emails are delivered (Resend)
- [ ] **Performance:** Run Lighthouse (target 90+)
- [ ] **Mobile:** Responsive on common devices
- [ ] **Secrets:** No secrets in client bundle; envs set in Vercel
- [ ] **DB:** MongoDB connection stable; indexes applied
- [ ] **Error Handling:** Invalid input returns proper errors

---

## 8. Monitoring & Maintenance

### Performance Monitoring
- **Vercel Analytics:** Web Vitals and RUM (if enabled)
- **Lighthouse CI (optional):**
```bash
npm install -g @lhci/cli
lhci autorun --config=lighthouserc.json
```

### Error Tracking
- **Sentry (recommended):**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Database Monitoring
- **MongoDB Atlas:** Monitor slow queries, index suggestions, and connection usage

### Email Monitoring
- **Resend logs:** Track bounces and delivery rates

---

## 9. Backup & Disaster Recovery

### Database Backups
- **Atlas Snapshots:** Enable backups in MongoDB Atlas (preferred)
- **Manual Dumps:**
```bash
mongodump --uri="your-mongodb-uri" --archive=backup.gz --gzip
```

### Restore (Development Only)
```bash
mongorestore --uri="your-mongodb-uri" --archive=backup.gz --gzip
```

### Code Repository
- **GitHub:** Primary source of truth; consider mirroring if needed

---

## 10. Scaling Considerations

| Metric | Free Tier Baseline | Scale Consideration |
| :--- | :--- | :--- |
| **MongoDB Atlas** | Shared cluster | Upgrade to dedicated cluster as data grows |
| **Gemini API** | Free tier quotas | Increase quota for higher suggestion volume |
| **Email (Resend)** | Per-plan limits | Upgrade plan if verification volume grows |
| **Vercel** | Hobby limits | Pro plan for higher bandwidth/functions |

Optimization tips:
1. Cache Gemini suggestions on client for short sessions
2. Add MongoDB indexes (already recommended) to keep dashboard queries fast
3. Use `next/dynamic` for heavy components to reduce bundle size
4. Keep `NEXT_PUBLIC_APP_URL` accurate to avoid auth callback issues

---

## 11. Common Issues & Troubleshooting

### Issue: "Session Invalid" (401)
- Verify `NEXTAUTH_SECRET` 
- Confirm cookies are set (httpOnly) and domain matches `NEXT_PUBLIC_APP_URL`

### Issue: "Email Not Sending"
- Check Resend key validity
- Inspect provider logs for bounces
- Ensure less-secure access is not required (use app passwords)

### Issue: "MongoDB Connection Fails"
- Whitelist IP or use `0.0.0.0/0` (dev only) in Atlas
- Verify `MONGODB_URI` format
- Check SRV record resolution on your network

### Issue: "Gemini Suggestions Fail"
- Verify `GEMINI_API_KEY`
- Check quota/limits in Google AI Studio
- Fallback: allow sending messages without suggestions

### Issue: "Next.js Build Fails"
- Run `npm run lint` and `npm run build` locally to see errors
- Ensure all required env vars are set in Vercel
- Confirm Node version is 18+ in Vercel project settings

---

## 12. Development Scripts Reference

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint |

---

## 13. Security Best Practices

### Environment Variables
- Do not commit `.env.local`
- Use distinct keys for dev vs. prod
- Store secrets in Vercel encrypted env vars

### Authentication
- Credential-based auth with email verification
- Sessions stored in httpOnly cookies (NextAuth)
- Enforce strong passwords and lockout throttling (future enhancement)

### API & Data
- Validate all inputs with Zod
- Do not log sensitive data (emails, message content)
- Apply rate limits on `/api/send-message` and `/api/suggest-messages` (planned)

### Email
- Use app passwords or Resend API keys; never store raw credentials in client

---

## Appendix: Related Documents
- [PRD.md](./PRD.md) - Product requirements and user stories
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and technical design
- [API.md](./API.md) - Detailed API endpoint documentation
- [README.md](../README.md) - Project overview and quick start

---

## Support & Contact
For deployment issues or questions:
- **GitHub Issues:** https://github.com/Leonardo1903/EchoVault/issues
- **Resend Support:** https://resend.com/support
- **MongoDB Atlas Support:** https://www.mongodb.com/cloud/atlas/support
- **Vercel Support:** https://vercel.com/support
