# AI Kingdom Council - Session Resources

Thank you for attending the session! Here are the resources and a summary of the project we discussed.

## Project Overview

**AI Kingdom Council** is a real-time, AI-powered application that demonstrates the integration of modern web technologies with artificial intelligence. The project features a dynamic frontend and a robust backend capable of real-time event streaming.

## Tech Stack

### Frontend

The frontend is built for performance and a premium user experience using:

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)

### Backend

The backend handles AI logic and real-time communication:

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Real-time Communication**: [Socket.io](https://socket.io/)
- **AI Integration**: [OpenAI SDK](https://platform.openai.com/docs/libraries/node-js) & [Vercel AI SDK](https://sdk.vercel.ai/docs)

## Key Features Implemented

1. **Real-time Updates**: Using Socket.io to stream events from the backend to the frontend instantly.
2. **AI Integration**: Leveraging OpenAI models to generate content and make decisions within the "Kingdom Council".
3. **Modern UI/UX**: A responsive and animated interface using the latest design patterns.
4. **Type Safety**: Full TypeScript implementation across the stack for robust code quality.

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v18 or higher)
- npm or bun

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Set up your `.env` file with your OpenAI API key and database URL.
Start the server:

```bash
npm run dev
```

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd kingdom-council-ui
npm install
```

Start the development server:

```bash
npm run dev
```

## Learning Resources

- **React Documentation**: <https://react.dev/learn>
- **TypeScript Handbook**: <https://www.typescriptlang.org/docs/>
- **Tailwind CSS Docs**: <https://tailwindcss.com/docs>
- **Prisma Quickstart**: <https://www.prisma.io/docs/getting-started>
- **Socket.io Tutorial**: <https://socket.io/get-started/chat>

---
*Built with ❤️ for the AI Kingdom Council Session*
