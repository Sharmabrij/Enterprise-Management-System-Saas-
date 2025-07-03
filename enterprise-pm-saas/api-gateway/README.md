# API Gateway

Enterprise-grade multi-tenant project management SaaS API Gateway built with Express.js and TypeScript.

## Features

- 🔐 JWT-based authentication
- 🏢 Multi-tenant organization support
- 📊 Project management CRUD operations
- 🛡️ Advanced middleware (CORS, rate limiting, validation)
- 🗄️ PostgreSQL database integration
- ⚡ Redis caching
- 🐳 Docker containerization
- 🔄 Graceful shutdown handling
- 📝 Comprehensive logging

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (optional)
- Docker (optional)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   
   Or create `.env` manually with:
   ```env
   # Server Configuration
   PORT=3333
   NODE_ENV=development
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=24h
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=enterprise_pm
   DB_USER=postgres
   DB_PASSWORD=password
   
   # Redis Configuration
   REDIS_URL=redis://localhost:6379
   
   # Logging
   LOG_LEVEL=info
   
   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   
   # CORS
   CORS_ORIGIN=http://localhost:3000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

### Docker

```bash
# Build image
docker build -t api-gateway .

# Run container
docker run -p 3333:3333 --env-file .env api-gateway
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Organizations
- `GET /api/organizations` - List organizations
- `POST /api/organizations` - Create organization
- `GET /api/organizations/:id` - Get organization
- `PUT /api/organizations/:id` - Update organization
- `DELETE /api/organizations/:id` - Delete organization

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Health
- `GET /api/health` - Health check

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Multi-Tenant Support

The API supports multi-tenancy through:
- `X-Tenant-ID` header
- Subdomain-based tenant identification

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building
```bash
npm run build
```

## Project Structure

```
src/
├── common/           # Shared utilities
│   ├── database.ts   # Database connection
│   ├── redis.ts      # Redis connection
│   ├── logger.ts     # Logging utility
│   └── graceful-shutdown.ts
├── config/           # Configuration
│   └── environment.ts
├── controllers/      # Request handlers
├── middleware/       # Express middleware
├── routes/          # Route definitions
├── services/        # Business logic
└── main.ts          # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT 