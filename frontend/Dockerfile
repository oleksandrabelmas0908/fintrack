# --- Build frontend ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy root package.json & lockfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build frontend (Vite will output to dist/public)
RUN npm run build

# --- Serve with Nginx ---
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build output from build stage
COPY --from=build /app/dist/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
