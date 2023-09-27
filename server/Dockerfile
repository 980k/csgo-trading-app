# Use Node.js version 18 as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your Node.js application is listening on (if needed)
EXPOSE 4000

# Define the startup command
CMD ["node", "server.js"]