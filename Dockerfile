# Build stage - Updated for Coolify deployment
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn generate

# Debug and ensure we have content to serve
RUN echo "=== BUILD DEBUG INFO ===" && \
    echo "Contents of .output directory:" && \
    ls -la .output/ 2>/dev/null || echo "No .output directory found" && \
    echo "Contents of .output/public:" && \
    ls -la .output/public/ 2>/dev/null || echo "No .output/public directory found" && \
    echo "=== COPYING FILES ===" && \
    mkdir -p /tmp/html && \
    if [ -d ".output/public" ] && [ "$(ls -A .output/public 2>/dev/null)" ]; then \
        echo "✓ Using generated files from .output/public"; \
        cp -r .output/public/* /tmp/html/ && \
        echo "✓ Files copied successfully"; \
    else \
        echo "⚠ No generated files found, creating fallback content"; \
        echo '<!DOCTYPE html><html><head><title>Kanri</title></head><body><h1>Kanri App - Fallback</h1><div id="__nuxt"></div></body></html>' > /tmp/html/index.html; \
    fi && \
    echo "=== FINAL CHECK ===" && \
    echo "Contents of /tmp/html/:" && \
    ls -la /tmp/html/ && \
    echo "Size of index.html:" && \
    wc -c /tmp/html/index.html 2>/dev/null || echo "No index.html found"

# Production stage  
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy the prepared content
COPY --from=builder /tmp/html/ /usr/share/nginx/html/

# Debug what was copied
RUN echo "=== NGINX STAGE DEBUG ===" && \
    echo "Contents of /usr/share/nginx/html/:" && \
    ls -la /usr/share/nginx/html/ && \
    echo "Size of index.html:" && \
    wc -c /usr/share/nginx/html/index.html 2>/dev/null || echo "No index.html found" && \
    echo "First 200 chars of index.html:" && \
    head -c 200 /usr/share/nginx/html/index.html 2>/dev/null || echo "Could not read index.html"

# Remove default nginx config and copy our custom one
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure nginx can access the files
RUN chmod -R 755 /usr/share/nginx/html

# Verify nginx config
RUN echo "=== NGINX CONFIG CHECK ===" && \
    cat /etc/nginx/conf.d/default.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
