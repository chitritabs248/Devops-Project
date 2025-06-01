# Stage 1: Build Frontend
FROM node:20 as frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:20 as backend-builder
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./
RUN npm run build

# Stage 3: Final image
FROM node:20-alpine

WORKDIR /app

# Copy backend build and files
COPY --from=backend-builder /app/backend ./backend

# Copy frontend build output
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Expose port (adjust if needed)
EXPOSE 3000

# Start backend server (adjust if your entry point differs)
CMD ["node", "backend/server.js"]
