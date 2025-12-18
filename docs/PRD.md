# Product Requirements Document (PRD)

| Project Name | **Version** | **Status** | **Author** | **Last Updated** |
| :--- | :--- | :--- | :--- | :--- |
| EchoVault | 1.0 (MVP) | 🟢 Active Development | Leonardo Fernandes | December 18, 2025 |

---

## 1. Problem Statement
**The "Why":** Individuals and organizations struggle to gather honest, constructive feedback from their peers, teams, and audiences. Traditional feedback methods lack anonymity, leading to filtered responses driven by social pressure or fear of judgment. They need a secure platform where feedback can be given without revealing identity, while recipients gain visibility into actionable insights.

**The Solution:** A modern anonymous feedback platform that combines true anonymity with AI-powered message suggestions to promote constructive communication. Users create profiles to receive anonymous messages, senders provide honest feedback without fear, and Google Gemini-powered suggestions help guide conversations toward meaningful dialogue. A personal dashboard gives recipients control and visibility over their received feedback.

---

## 2. User Personas
| Persona | Role | Pain Point | Goal |
| :--- | :--- | :--- | :--- |
| **Alex (Content Creator)** | Influencer/Streamer | Wants honest feedback from followers but gets filtered comments; fears negative reception. | Needs a space for anonymous, candid feedback with AI guidance to keep conversations constructive. |
| **Maya (Team Manager)** | HR/Team Lead | Struggles to collect genuine employee feedback due to hierarchy concerns; responses are often sugar-coated. | Wants anonymous upward feedback channel where employees feel safe sharing concerns and suggestions. |
| **Jordan (Student)** | University Student | Wants to give peer feedback on presentations/projects but doesn't want to damage relationships. | Needs anonymous feedback mechanism for academic growth without social friction. |

---

## 3. User Stories (Functional Requirements)
*These define the scope of the MVP.*

### **Epic 1: Authentication & User Management**
- [x] As a user, I want to sign up with email and password so I can create my account.
- [x] As a user, I want to verify my email via OTP code for security and account activation.
- [x] As a user, I want to sign in with email or username for flexibility and ease of access.
- [x] As a user, I want a unique profile URL (echovault.com/u/[username]) where others can send me messages.
- [x] As a user, I want to view and edit my profile information in a dedicated profile page.

### **Epic 2: Anonymous Messaging**
- [x] As a visitor, I want to send an anonymous message to any registered user without needing to sign up.
- [x] As a visitor, I want to remain completely anonymous when sending messages; no tracking or identification.
- [x] As a sender, I want to view AI-powered message suggestions to help me craft constructive feedback.
- [x] As a sender, I want to customize suggested messages before sending to add my personal touch.
- [x] As a recipient, I want to receive messages on my dashboard with visibility into metadata (date, sender anonymity status).

### **Epic 3: Message Management & Dashboard**
- [x] As a recipient, I want to view all received messages in a personalized dashboard.
- [x] As a recipient, I want to read full message content to understand the feedback given.
- [x] As a recipient, I want to delete messages I don't want to keep to manage my feedback collection.
- [x] As a recipient, I want to mark messages as accepted to track valuable feedback.
- [x] As a recipient, I want to enable/disable message reception to control anonymous submissions.

### **Epic 4: AI-Powered Suggestions**
- [x] As a sender, I want AI-generated message suggestions based on context to jumpstart my feedback.
- [x] As a sender, I want suggestions to be constructive and focused on improvement, not criticism.
- [x] As a system, I want Gemini API to power suggestions for thoughtful, context-aware recommendations.
- [x] As a user, I want to regenerate suggestions if the current ones don't fit my needs.

### **Epic 5: UI/UX & Security**
- [x] As a user, I want clean, intuitive UI that makes sending and receiving messages simple.
- [x] As a user, I want visual feedback (toast notifications) for all actions (send, delete, etc.).
- [x] As a user, I want the platform to be secure with hashed passwords and protected routes.
- [x] As a user, I want responsive design that works on desktop and mobile browsers.

---

## 4. UI/UX Wireframes
*Key interface components implemented.*

### **Landing Page**
- Hero section with value proposition and call-to-action
- Features showcase highlighting anonymity, AI suggestions, and ease of use
- Navigation: Sign In, Sign Up buttons
- Links to existing user profiles via public URL

### **Dashboard Layout (Authenticated User)**
- Header with user profile dropdown and sign out button
- Welcome message with personalized username and profile URL
- Message reception status indicator (opt-in/opt-out toggle)
- List of received messages with metadata (sender, date, content preview)
- Action buttons for each message: Delete, Accept/Mark as important
- Empty state message when no messages received
- Responsive layout that works on mobile and desktop

### **Public Profile (Send Message)**
- Header displaying the recipient's username
- Public profile section showing user information
- Message input area with textarea for composing feedback
- Button to get AI-powered suggestions
- Send and Clear buttons for message actions
- AI Suggestions section displaying 3-5 constructive suggestions
- Option to regenerate suggestions if not satisfied
- Visual indicator showing recipient accepts anonymous messages

---

## 5. Non-Functional Requirements
*Technical constraints and performance goals.*

1. **Performance:** 
   - Dashboard must load received messages within **2 seconds**.
   - AI suggestion generation must complete within **3 seconds** via Gemini API.
   - Message sending must be confirmed within **1 second**.

2. **Scalability:** 
   - MongoDB must efficiently query messages for users with **1,000+ messages**.
   - Support concurrent message submissions with rate limiting (e.g., 5 messages per minute per sender IP).
   - Gemini API calls must be optimized to manage rate limits and costs.

3. **Security:**
   - All authentication handled via NextAuth with secure session management and JWT tokens.
   - Passwords hashed with bcrypt before storage in MongoDB.
   - API routes protected with authentication middleware to prevent unauthorized access.
   - User data isolated by userId to prevent cross-user access.
   - Anonymous senders have no traceable identity; no IP logging or fingerprinting.

4. **Reliability:**
   - Email verification system ensures account validity and reduces spam accounts.
   - Message storage persists reliably in MongoDB with automated backups.
   - Error handling with user-friendly error messages for API failures.
   - Graceful degradation if Gemini API is unavailable (users can still send messages without suggestions).

5. **Accessibility:**
   - Responsive design works on desktop, tablet, and mobile browsers.
   - Clear UI labels and error messages for all interactions.
   - Keyboard navigation support for all core actions.
   - Screen reader support for interactive elements.

---

## 6. Database Schema (High Level)
*See `ARCHITECTURE.md` for full details.*

### **Core Collections**

**Users**
- id (MongoDB ObjectId)
- username (unique, indexed)
- email (unique, indexed)
- passwordHash
- isVerified (boolean)
- verificationCode (temporary, for OTP)
- createdAt, updatedAt

**Messages**
- id (MongoDB ObjectId)
- recipientId (userId, indexed)
- senderUsername (optional, if not anonymous)
- content (text)
- isAccepted (boolean)
- createdAt, updatedAt

### **Indexes**
- `users.username` - Unique, for profile lookup
- `users.email` - Unique, for authentication
- `messages.recipientId, messages.createdAt DESC` - Fast dashboard listing
- `messages.recipientId, messages.isAccepted` - Accepted messages query

---

## 7. API Endpoints
*REST API structure.*

### **Authentication**
- `POST /api/sign-up` - User registration with email verification
- `POST /api/sign-in` - User login
- `POST /api/verify-code` - Verify OTP for email confirmation
- `POST /api/check-username-unique` - Validate username availability

### **Users & Profiles**
- `GET /api/u/[username]` - Get public profile info for message sending page
- `PATCH /api/user/profile` - Update user profile

### **Messages**
- `GET /api/get-messages` - Get all messages for authenticated user (with filters)
- `POST /api/send-message` - Send anonymous message to user
- `PATCH /api/accept-messages` - Toggle acceptance of messages (opt-in/opt-out)
- `DELETE /api/delete-message/[messageid]` - Delete a received message

### **AI & Suggestions**
- `GET /api/suggest-messages` - Get AI-powered message suggestions for a specific user

---

## 8. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14 (App Router) | Server-side rendering, API routes, routing |
| **Language** | TypeScript | Type safety and better developer experience |
| **UI Library** | shadcn/ui + Tailwind CSS | Pre-built accessible components, styling |
| **Authentication** | NextAuth.js | Session management, secure login, credential-based auth |
| **Database** | MongoDB (Atlas) | NoSQL storage for user and message data |
| **ODM** | Mongoose | Schema validation and query builder for MongoDB |
| **AI/Suggestions** | Google Gemini API | Context-aware message suggestions |
| **Email** | Resend | Sending verification emails |
| **Validation** | Zod | Schema validation for API requests |
| **Icons** | Lucide React | Consistent icon system |
| **Notifications** | Sonner | Toast messages for user feedback |

---

## 9. Future Roadmap (Post-MVP)
*Features we are NOT building yet, but planning for later.*

- [ ] **Message Threads:** Reply to feedback with follow-up messages for dialogue.
- [ ] **Reaction System:** Add emoji reactions to messages for quick feedback acknowledgment.
- [ ] **Message Analytics:** Visualize message trends, sentiment analysis, and feedback patterns.
- [ ] **Scheduled Messages:** Queue messages to be sent at specific times.
- [ ] **Message Templates:** Pre-built feedback templates for different contexts (peer review, team feedback, etc.).
- [ ] **User Mentions:** @ mention other users within messages for directed feedback.
- [ ] **Leaderboards:** Gamify feedback with badges and recognition for constructive contributors.
- [ ] **Integrations:** Connect with Slack, Discord for notifications.
- [ ] **Advanced Search:** Search messages by keywords, date range, acceptance status.
- [ ] **Mobile App:** Native iOS/Android apps with push notifications.

---

## 10. Success Metrics
*How do we know we succeeded?*

### **User Activation**
1. **Onboarding:** User can sign up, verify email, and send first message within **5 minutes**.
2. **Adoption:** 50% of users send at least one anonymous message within first week of signup.

### **Performance**
1. **Load Time:** Dashboard loads messages within **2 seconds** on 3G connection.
2. **AI Response:** Suggestion generation completes within **3 seconds** 95% of the time.

### **Reliability**
1. **Uptime:** 99.5% uptime for core features (send, receive, delete messages).
2. **Email Delivery:** 99% of verification emails delivered successfully.

### **User Satisfaction**
1. **Task Completion:** 90% of users successfully send and receive messages without support.
2. **Feature Engagement:** 65% of users utilize AI suggestions within first month.
3. **Retention:** 40% of users remain active 30 days after signup.

---

## 11. Constraints & Assumptions

### **Constraints**
- **Gemini API Rate Limits:** Free tier has limited quota; may need upgrade for >1,000 daily suggestions.
- **Email Service:** Dependent on reliable email delivery (Resend uptime).
- **MongoDB Limits:** Atlas free tier has storage limits; need to monitor and upgrade as user base grows.

### **Assumptions**
- Users primarily access via desktop and mobile web browsers.
- Average user receives <20 messages per week during active use.
- Senders will use AI suggestions more frequently than crafting messages manually.
- Users understand and appreciate true anonymity; trust is paramount.
- Email verification reduces spam accounts significantly.

---

## 12. Open Questions & Decisions Needed
*Issues to resolve before next milestone.*

- [ ] **Message Limits:** Should we enforce a rate limit on incoming messages per user?
- [ ] **Anonymous Opt-Out:** Can users permanently disable anonymous message reception?
- [ ] **Message Retention:** How long should deleted messages persist in database (soft delete)?
- [ ] **Content Moderation:** How do we handle offensive/abusive messages?
- [ ] **Public Beta:** When do we open to external users?
- [ ] **Monetization:** Freemium model or fully free?

---

## Appendix: Related Documents
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and technical design
- [README.md](../README.md) - Project overview and quick start
