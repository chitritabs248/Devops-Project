# Stage 1: Build frontend
FROM node:20 as frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Stage 2: Build backend
FROM node:20 as backend-builder
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install

COPY backend/ ./
# No build step since backend doesn't have "build" script

# Stage 3: Final image
FROM node:20-alpine
WORKDIR /app

# Copy backend code
COPY --from=backend-builder /app/backend ./backend

# Copy frontend build files (static files)
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Expose port your backend listens on, e.g., 4000
EXPOSE 4000

# Start backend server (adjust path as needed)
CMD ["node", "backend/server.js"]
