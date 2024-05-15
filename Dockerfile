# Use the official Node.js 20 image
FROM node:20-bullseye
ENV PUPPETEER_SKIP_DOWNLOAD=True

# Set the working directory
WORKDIR /app

# Install necessary packages for Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (optional, if your application serves on a specific port)
EXPOSE 3000

# Command to run your application (change as necessary)
CMD ["npm", "start"]
