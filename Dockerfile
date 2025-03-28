FROM node:18.15-alpine

# Ensure good permissions and create required directories
RUN chown -R root /opt && \
    chmod 755 /usr/local/bin/* && \
    mkdir -p /app

# Go to service directory
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm ci && \
    npm cache clean --force

# Copy sources
COPY . /app

# Compile app
RUN npm run dist

# Switch to service user
USER node

# Define the entry point
ENTRYPOINT ["npm", "run"]

CMD ["start:prod"]
