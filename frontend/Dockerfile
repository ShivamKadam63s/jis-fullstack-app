### STAGE 1: Build React + Tailwind
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package.json package-lock.json ./

# Install dependencies safely
RUN npm install --legacy-peer-deps

# Copy rest of frontend code
COPY . .

# Build the frontend
RUN npm run build


### STAGE 2: Nginx for serving build files
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config (you must have nginx.conf in frontend/)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy React build output
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
