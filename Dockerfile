# =============================================================================
# DOCKERFILE FOR GOOGLE CLOUD RUN DEPLOYMENT
# =============================================================================

# Use Node.js LTS version (Cloud Run compatible)
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files for dependency installation
COPY package*.json ./
COPY server/package*.json ./server/
COPY view/package*.json ./view/

# Install root dependencies
RUN npm ci --legacy-peer-deps

# Install workspace dependencies
RUN npm install --workspace=server --legacy-peer-deps && \
    npm install --workspace=view --legacy-peer-deps

# Copy source files
COPY . .

# Build the frontend (outputs to server/view)
RUN npm run build --workspace=view

# Remove dev dependencies and view source files to reduce image size
RUN npm prune --production --workspace=server && \
    rm -rf view/src view/public view/node_modules view/package*.json view/vite.config.js

# Remove root dev dependencies
RUN npm prune --production

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose port (Cloud Run will set PORT environment variable)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 8080) + '/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the server
CMD ["node", "server/index.js"]

