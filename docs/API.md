# API Documentation

| Project | **Base URL** | **Version** | **Authentication** |
| :--- | :--- | :--- | :--- |
| EchoVault API | `https://echovault.leonardo1903.me/api` | 1.0.0 | NextAuth Session (httpOnly cookie) |

---

## 1. Authentication
All protected API endpoints require a valid NextAuth session cookie. Authentication is handled via NextAuth credentials provider with email/password and verification.

**Session Verification:**
- Client-side: `useSession()` provides authenticated user data
- Server-side: `getServerSession()` verifies session inside API routes

**No manual token management required** — NextAuth stores session tokens in httpOnly cookies.

---

## 2. Endpoints

### A. Authentication & Verification Module

#### `POST /api/sign-up`
Registers a new user and sends verification code via email.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "alice",
  "password": "secret-password"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User created. Verification code sent."
}
```

---

#### `POST /api/verify-code`
Verifies the OTP sent to the user's email and activates the account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

#### `GET /api/check-username-unique`
Checks whether a username is available.

**Query Parameters:**

| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| username | string | Yes | Username to check for availability |

**Example Request:**
```bash
GET /api/check-username-unique?username=alice
```

**Response (200 OK):**
```json
{
  "success": true,
  "isAvailable": true
}
```

---

### B. Messages Module

#### `POST /api/send-message`
Sends an anonymous message to a user profile.

**Request Body:**
```json
{
  "username": "alice",           // recipient username
  "content": "Great job on your talk!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

#### `GET /api/get-messages`
Retrieves all messages for the authenticated user.

**Authentication:** Requires NextAuth session.

**Query Parameters:**

| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| accepted | string | No | Set to "true" to fetch only accepted messages |

**Example Request:**
```bash
GET /api/get-messages?accepted=true
```

**Response (200 OK):**
```json
{
  "success": true,
  "messages": [
    {
      "_id": "msg_abc123",
      "content": "Great job on the presentation!",
      "isAccepted": true,
      "createdAt": "2025-12-18T10:00:00.000Z"
    }
  ]
}
```

---

#### `DELETE /api/delete-message/[messageid]`
Deletes a specific message belonging to the authenticated user.

**Path Parameters:**
- `messageid` - The MongoDB ObjectId of the message

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Message deleted successfully"
}
```

---

#### `PATCH /api/accept-messages`
Toggles whether the authenticated user accepts incoming anonymous messages.

**Request Body:**
```json
{
  "acceptMessages": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "acceptMessages": true,
  "message": "Preferences updated"
}
```

---

### C. AI Suggestions Module

#### `GET /api/suggest-messages`
Retrieves AI-generated message suggestions for a given username.

**Query Parameters:**

| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| username | string | Yes | Recipient username for context |

**Example Request:**
```bash
GET /api/suggest-messages?username=alice
```

**Response (200 OK):**
```json
{
  "success": true,
  "suggestions": [
    "I appreciated how clearly you explained the topic.",
    "One idea to improve: add more examples to the intro section.",
    "Your pacing was great; consider a short summary at the end."
  ]
}
```

---

## 3. Error Codes
The API uses standard HTTP status codes.

| Code | Meaning | Description |
| :--- | :--- | :--- |
| 200 | OK | Request succeeded. |
| 201 | Created | Resource successfully created. |
| 400 | Bad Request | Missing required fields, invalid JSON, or validation error. |
| 401 | Unauthorized | Invalid or missing session. User must sign in. |
| 403 | Forbidden | User does not have permission to access this resource. |
| 404 | Not Found | The requested resource does not exist or has been deleted. |
| 409 | Conflict | Resource already exists (e.g., username taken). |
| 413 | Payload Too Large | Request body size exceeds allowed limit. |
| 429 | Too Many Requests | Rate limit exceeded. Retry after the specified time. |
| 500 | Server Error | Internal server error. Database or external service failure. |
| 503 | Service Unavailable | External service temporarily unavailable. |

---

## 4. Error Response Format
All error responses follow a consistent format:

```json
{
  "success": false,
  "error": "ErrorType",
  "message": "Human-readable error description"
}
```

**Example Errors:**

**Missing Required Field:**
```json
{
  "success": false,
  "error": "ValidationError",
  "message": "username is required"
}
```

**Resource Not Found:**
```json
{
  "success": false,
  "error": "ResourceNotFound",
  "message": "Message with ID msg_abc123 does not exist"
}
```

**Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "You must be signed in to access this resource"
}
```

---

## 5. Rate Limiting
*(Planned for future implementation)*

**Proposed Limits:**
- **Standard Endpoints:** 100 requests per minute per user/IP
- **Send Message Endpoint:** 10 messages per minute per IP
- **Suggestions Endpoint:** 5 requests per minute per IP

**Headers (Future):**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1702991400
```

---

## 6. Pagination
*(Planned for future implementation)*

Current endpoints return all applicable items. Future versions will support pagination for message lists.

**Query Parameters (future):**
- `limit` (number) - Items per page (default: 50, max: 100)
- `page` (number) - Page number (1-indexed)
- `cursor` (string) - Cursor for pagination of large datasets

**Response Meta (future):**
```json
{
  "data": [...],
  "meta": {
    "total": 250,
    "page": 1,
    "limit": 50,
    "hasMore": true,
    "nextCursor": "cursor_xyz"
  }
}
```

---

## 7. Webhooks
*(Planned for future implementation)*

Future support for notifications:
- `message.received` - Triggered when a message is delivered
- `user.verified` - Triggered when email verification succeeds
- `messages.acceptance_toggled` - Triggered when a user changes acceptance preference

---

## Appendix: Related Documents
- [PRD.md](./PRD.md) - Product requirements and user stories
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture and technical design
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment and operations guide
- [README.md](../README.md) - Project overview and quick start
