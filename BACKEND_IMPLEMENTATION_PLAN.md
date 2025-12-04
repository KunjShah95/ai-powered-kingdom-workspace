# Backend Implementation Plan - AI Kingdom Council

## Complete Node.js Backend Architecture

## 📋 Overview

Building a robust Node.js backend with TypeScript, Express.js, and WebSocket support to power the AI Kingdom Council application.

---

## 🛠️ Tech Stack

### Core Technologies

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite (with Prisma ORM) - easily upgradeable to PostgreSQL
- **Real-time**: Socket.IO for WebSocket connections
- **Validation**: Zod for schema validation
- **Authentication**: JWT (JSON Web Tokens)

### Key Dependencies

```json
{
  "express": "^4.18.2",
  "socket.io": "^4.6.1",
  "prisma": "^5.7.0",
  "@prisma/client": "^5.7.0",
  "zod": "^3.22.4",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "winston": "^3.11.0"
}
```

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── index.ts                    # Entry point
│   ├── app.ts                      # Express app configuration
│   ├── config/
│   │   ├── database.ts             # Database configuration
│   │   ├── environment.ts          # Environment variables
│   │   └── logger.ts               # Winston logger setup
│   ├── routes/
│   │   ├── index.ts                # Route aggregator
│   │   ├── council.routes.ts       # Council member endpoints
│   │   ├── events.routes.ts        # Kingdom events endpoints
│   │   ├── files.routes.ts         # File system operations
│   │   └── auth.routes.ts          # Authentication endpoints
│   ├── controllers/
│   │   ├── council.controller.ts   # Council business logic
│   │   ├── events.controller.ts    # Events business logic
│   │   ├── files.controller.ts     # File operations logic
│   │   └── auth.controller.ts      # Auth logic
│   ├── services/
│   │   ├── council.service.ts      # Council data operations
│   │   ├── events.service.ts       # Events data operations
│   │   ├── files.service.ts        # File system service
│   │   └── websocket.service.ts    # WebSocket manager
│   ├── middleware/
│   │   ├── auth.middleware.ts      # JWT validation
│   │   ├── error.middleware.ts     # Error handling
│   │   └── validation.middleware.ts # Request validation
│   ├── models/
│   │   └── schemas.ts              # Zod validation schemas
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   └── utils/
│       ├── response.utils.ts       # Standardized API responses
│       └── file-watcher.utils.ts   # File system monitoring
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Database migrations
├── tests/
│   ├── unit/                       # Unit tests
│   └── integration/                # Integration tests
├── .env                            # Environment variables
├── .env.example                    # Example environment file
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies
└── README.md                       # Backend documentation
```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model CouncilMember {
  id          String   @id @default(uuid())
  name        String
  role        String
  title       String
  avatarUrl   String?
  description String?
  stats       Json?    // Wisdom, Strength, Intelligence, etc.
  status      String   @default("active") // active, inactive
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("council_members")
}

model KingdomEvent {
  id          String   @id @default(uuid())
  type        String   // decree, battle, ritual, council
  title       String
  description String
  severity    String   // low, medium, high, critical
  metadata    Json?    // Flexible data storage
  timestamp   DateTime @default(now())
  
  @@map("kingdom_events")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  username  String   @unique
  role      String   @default("citizen") // citizen, admin, king
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@map("users")
}

model FileChange {
  id        String   @id @default(uuid())
  path      String
  action    String   // created, modified, deleted
  content   String?
  timestamp DateTime @default(now())
  
  @@map("file_changes")
}
```

---

## 🔌 API Endpoints

### 1. **Council Management** (`/api/council`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/council/members` | Get all council members | No |
| GET | `/api/council/members/:id` | Get specific member | No |
| POST | `/api/council/members` | Create new member | Yes (Admin) |
| PUT | `/api/council/members/:id` | Update member | Yes (Admin) |
| DELETE | `/api/council/members/:id` | Remove member | Yes (Admin) |
| PATCH | `/api/council/members/:id/stats` | Update member stats | Yes (Admin) |

### 2. **Kingdom Events** (`/api/events`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/events` | Get all events (paginated) | No |
| GET | `/api/events/:id` | Get specific event | No |
| POST | `/api/events` | Create new event | Yes |
| DELETE | `/api/events/:id` | Delete event | Yes (Admin) |
| GET | `/api/events/recent` | Get recent events (last 24h) | No |

### 3. **File Operations** (`/api/files`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/files` | List all project files | Yes |
| GET | `/api/files/:path` | Get file content | Yes |
| POST | `/api/files/:path` | Create/Update file | Yes |
| DELETE | `/api/files/:path` | Delete file | Yes (Admin) |
| GET | `/api/files/changes` | Get recent file changes | Yes |

### 4. **Authentication** (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/refresh` | Refresh JWT token | Yes |
| GET | `/api/auth/me` | Get current user | Yes |

---

## ⚡ WebSocket Events (Socket.IO)

### Server → Client Events

```typescript
// Real-time updates pushed to frontend
socket.emit('council:member:created', memberData);
socket.emit('council:member:updated', memberData);
socket.emit('council:member:deleted', memberId);

socket.emit('event:created', eventData);
socket.emit('event:deleted', eventId);

socket.emit('file:created', fileData);
socket.emit('file:modified', fileData);
socket.emit('file:deleted', filePath);

socket.emit('agent:progress', progressData);
socket.emit('agent:completed', resultData);
```

### Client → Server Events

```typescript
// Client can request updates
socket.on('council:subscribe', () => {});
socket.on('events:subscribe', () => {});
socket.on('files:subscribe', () => {});
```

---

## 📝 Implementation Steps

### **Phase 1: Project Setup** (Day 1)

1. ✅ Create `backend/` directory structure
2. ✅ Initialize `package.json` with dependencies
3. ✅ Setup TypeScript configuration
4. ✅ Configure Prisma with SQLite
5. ✅ Setup environment variables (`.env`)
6. ✅ Configure logger (Winston)
7. ✅ Setup basic Express app structure

### **Phase 2: Database & Models** (Day 1-2)

8.✅ Define Prisma schema
9.✅ Run initial migration
10.✅ Create Zod validation schemas
11.✅ Generate Prisma client
12.✅ Setup database seed data

### **Phase 3: Core API** (Day 2-3)

13.✅ Implement Council routes & controllers
14.✅ Implement Events routes & controllers
15.✅ Implement Authentication (JWT)
16.✅ Add request validation middleware
17.✅ Add error handling middleware
18.✅ Create standardized response utilities

### **Phase 4: File System Integration** (Day 3-4)

19.✅ Implement file routes & controllers
20.✅ Create file watching utility (chokidar)
21.✅ Setup file change tracking
22.✅ Add file operation security checks

### **Phase 5: Real-time Features** (Day 4-5)

23.✅ Setup Socket.IO server
24.✅ Implement WebSocket service
25.✅ Connect file watcher to WebSocket
26.✅ Implement event broadcasting
27.✅ Add connection management & authentication

### **Phase 6: Testing & Documentation** (Day 5-6)

28.✅ Write unit tests for services
29.✅ Write integration tests for API
30.✅ Test WebSocket connections
31.✅ Create API documentation
32.✅ Update README with setup instructions

### **Phase 7: Frontend Integration** (Day 6)

33.✅ Update frontend API client
34.✅ Implement WebSocket client in frontend
35.✅ Test end-to-end real-time updates
36.✅ Handle CORS configuration

---

## 🔐 Security Considerations

1. **Authentication**: JWT with secure secret keys
2. **Authorization**: Role-based access control (RBAC)
3. **Input Validation**: Zod schemas for all inputs
4. **File Access**: Sandboxed file operations within project directory
5. **Rate Limiting**: Prevent API abuse
6. **CORS**: Whitelist frontend origin only
7. **Password Hashing**: bcrypt with salt rounds

---

## 🧪 Testing Strategy

### Unit Tests

```bash
# Test individual services
npm run test:unit
```

### Integration Tests

```bash
# Test API endpoints
npm run test:integration
```

### WebSocket Tests

```bash
# Test real-time connections
npm run test:ws
```

### Manual Testing

1. Start backend: `npm run dev`
2. Visit Swagger docs: `http://localhost:3001/api-docs`
3. Test endpoints with Postman/Thunder Client
4. Connect frontend and verify real-time updates

---

## 🚀 Getting Started Commands

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma migrate dev --name init

# Seed database (optional)
npm run seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📊 Environment Variables

```env
# .env file
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173

# File Watching
WATCH_DIRECTORY=../kingdom-council-ui

# Logging
LOG_LEVEL=info
```

---

## 🔄 Real-time Update Flow

``` text
File Modified → File Watcher Detects Change 
                      ↓
              WebSocket Service Notified
                      ↓
          Socket.IO Broadcasts to All Clients
                      ↓
              Frontend Receives Update
                      ↓
        Frontend Auto-refreshes Preview/List
```

---

## 📦 Future Enhancements

1. **Database Migration**: SQLite → PostgreSQL for production
2. **Caching**: Redis for frequently accessed data
3. **Message Queue**: Bull/BullMQ for background jobs
4. **API Versioning**: `/api/v1`, `/api/v2`
5. **GraphQL**: Alternative to REST API
6. **Docker**: Containerization for easy deployment
7. **Monitoring**: Prometheus + Grafana
8. **CI/CD**: GitHub Actions for automated testing

---

## ✅ Success Criteria

- [ ] All API endpoints functional and tested
- [ ] WebSocket real-time updates working
- [ ] File changes detected and broadcast to frontend
- [ ] Frontend successfully integrates with backend
- [ ] Database persists data correctly
- [ ] Authentication/Authorization working
- [ ] Error handling graceful and informative
- [ ] API documentation complete

---

**Ready to proceed?** I'll start implementing this step-by-step!
