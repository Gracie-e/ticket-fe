# Ticket System Frontend

## Overview
A modern React frontend built with Vite, showcasing a structured approach to frontend development with TypeScript, featuring API client abstractions, custom hooks, and comprehensive type safety.

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- .NET backend running on port 5015

### Environment Setup
1. Create a `.env` file in the root directory:
```env
VITE_BASE_API_URL="http://localhost:5015/api"
VITE_BASE_URL="http://localhost:5015"
```

2. Install dependencies:
```bash
npm i
```

3. Start development server:
```bash
npm run dev
```

## Project Structure
```
src/
├── api-client/          # API client classes for backend communication
│   └── TicketClient.ts
├── contexts/           # React contexts for state management
├── layouts/            # Layout components including RootLayout
├── lib/
│   └── api/           # API utilities (fetcher, etc.)
├── types/             # TypeScript type definitions
│   ├── api/          # API-related types
│   ├── dto/          # Data Transfer Objects
│   └── models/       # Domain models
└── components/        # UI components
```

## Key Features

### API Client Pattern
- Centralized API communication through dedicated client classes
- Type-safe request/response handling
- Environment-aware configuration


### Custom Fetcher
- Standardized error handling
- Type-safe responses using generics
- Consistent API response structure

### Type Safety
- Zod for runtime validation
- Comprehensive TypeScript types
- Type-safe API responses and requests

### UI Components
- Leverages shadcn/ui for consistent, customizable components
- Easy theme customization
- Accessible by default

## Development Patterns

### API Layer
- Client classes handle all API communication
- Centralized error handling
- Type-safe requests and responses

### State Management
- React Context for global state
- Custom hooks for reusable logic
- Type-safe context consumers

