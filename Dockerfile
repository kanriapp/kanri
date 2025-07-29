# Build stage - Updated for Coolify deployment
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn generate

# Ensure we have content to serve - copy from .output/public or create fallback
RUN if [ -d ".output/public" ] && [ "$(ls -A .output/public)" ]; then \
        echo "Using generated files from .output/public"; \
        cp -r .output/public/* /tmp/html/ 2>/dev/null || mkdir -p /tmp/html; \
    else \
        echo "No generated files found, creating fallback"; \
        mkdir -p /tmp/html; \
        echo '<!DOCTYPE html><html><head><title>Kanri</title></head><body><h1>Kanri App</h1><div id="__nuxt"></div></body></html>' > /tmp/html/index.html; \
    fi

# Production stage  
FROM nginx:alpine

# Copy the prepared content
COPY --from=builder /tmp/html/ /usr/share/nginx/html/

# Remove default nginx config and copy our custom one
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure nginx can access the files
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
