# Snippet Vault

Snippet Vault is a full-stack monorepo application for managing and organizing code snippets. It features a modern web interface and a robust RESTful API.

## Project Structure

This project is a monorepo managed with npm workspaces:

- `apps/frontend`: [Next.js](https://nextjs.org/) web application.
- `apps/backend`: [NestJS](https://nestjs.com/) REST API.

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Radix UI
- **Icons**: Lucide React

### Backend
- **Framework**: NestJS 11
- **Database**: MongoDB with Mongoose
- **Validation**: class-validator & class-transformer

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a remote URI)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/marharita08/snippet-vault
   cd snippet-vault
   ```

2. Install dependencies for the entire project:
   ```bash
   npm install
   ```

### Environment Setup

You need to set up environment variables for both the frontend and backend.

1. **Backend**:
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```
   Edit `apps/backend/.env` and provide your `MONGO_URI`.

2. **Frontend**:
   ```bash
   cp apps/frontend/.env.example apps/frontend/.env
   ```
   Ensure `NEXT_PUBLIC_API_URL` points to your backend (default is `http://localhost:3001`).

---

## Development

To run both applications in development mode with hot-reloading:

### Run Backend
```bash
npm run dev:backend
```
The API will be available at `http://localhost:3001`.

### Run Frontend
```bash
npm run dev:frontend
```
The web app will be available at `http://localhost:3000`.

---

## Production

### Building the applications

Build both apps:
```bash
npm run build --workspace=frontend
npm run build --workspace=backend
```

### Running in production

```bash
npm run start --workspace=frontend
npm run start:prod --workspace=backend
```

---

## API Reference

The backend provides a RESTful API for snippet management. All endpoints are relative to `http://localhost:3001`.

### Snippets

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/snippets` | Get all snippets (supports pagination, `search`, and `tags` filter) |
| `GET` | `/snippets/:id` | Get a specific snippet by ID |
| `POST` | `/snippets` | Create a new snippet |
| `PATCH` | `/snippets/:id` | Update an existing snippet |
| `DELETE` | `/snippets/:id` | Delete a snippet |

#### Example: Search and Filter
`GET /snippets?search=react&tags=frontend,js&page=1&limit=10`

#### Example: Create Snippet
`POST /snippets`
```json
{
  "title": "React Hook",
  "content": "const useCustom = () => { ... }",
  "type": "note",
  "tags": ["react", "hook"]
}
```


