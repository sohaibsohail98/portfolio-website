# Static Astro build served by nginx. Exists so the optional Cloud Run
# deploy path (see .github/workflows/cloudrun.yml) has an image to build.
# Cloudflare Pages remains the primary host.

FROM node:22-alpine AS build
WORKDIR /app
COPY astro/package.json astro/package-lock.json ./
RUN npm ci
COPY astro ./
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
