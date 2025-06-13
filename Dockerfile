# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy backend package files and install dependencies
COPY ./backend/package*.json ./
RUN npm install

# Copy backend code
COPY ./backend ./

# Copy frontend and install dependencies
COPY ./frontend ./frontend
RUN cd frontend && npm install && npm run build

# Move frontend build into backend public folder (or serve manually)
RUN mkdir -p ./frontend/dist && cp -r frontend/dist ./frontend/dist

# Optional: if you want to serve frontend from Express
# Make sure your Express server serves static files from ./frontend/dist

# Expose backend port
EXPOSE 4000

# Start the backend server
CMD ["node", "server.js"]
