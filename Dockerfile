# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Install backend dependencies
COPY ./backend/package*.json ./
RUN npm install

# Copy backend source code
COPY ./backend .

# Copy built frontend (already inside backend/dist)
COPY ./backend/dist ./dist

# Expose backend port
EXPOSE 4000

# Start the backend server
CMD ["node", "server.js"]
