# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Debug: Show files before generate
RUN echo "=== Files before generate ===" && ls -la

# Generate static files for SPA
RUN yarn generate

# Debug: Show what was generated
RUN echo "=== Files after generate ===" && ls -la
RUN echo "=== .output directory ===" && ls -la .output/ || echo "No .output directory"
RUN echo "=== .output/public directory ===" && ls -la .output/public/ || echo "No .output/public directory"
RUN echo "=== dist directory ===" && ls -la dist/ || echo "No dist directory"
RUN echo "=== .nuxt directory ===" && ls -la .nuxt/ || echo "No .nuxt directory"

# Production stage
FROM nginx:alpine

# Remove default nginx content first
RUN rm -rf /usr/share/nginx/html/*

# Try to copy from the most likely location
COPY --from=builder /app/.output/public /usr/share/nginx/html

# Debug: Check what's actually in nginx html directory
RUN echo "=== Final nginx html contents ===" && ls -la /usr/share/nginx/html/ || echo "Directory is empty or doesn't exist"
RUN echo "=== Checking for index.html ===" && cat /usr/share/nginx/html/index.html 2>/dev/null | head -10 || echo "No index.html found"

# Create a custom nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    # Handle static assets with proper caching \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
