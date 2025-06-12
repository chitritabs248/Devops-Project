# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend files
COPY ./backend/package*.json ./
RUN npm install

# Copy rest of the backend code
COPY ./backend .

# If dist folder is in backend, copy it too
COPY ./backend/dist ./dist

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]
