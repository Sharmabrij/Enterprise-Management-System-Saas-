# Use official Node.js LTS image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port
EXPOSE 3000

# Start the app (for dev, use ts-node)
CMD ["npx", "ts-node", "./src/main.ts"] 