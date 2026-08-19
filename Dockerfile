# Static site on nginx. Included because it was asked for, not because it is the
# right host for 44KB of HTML — Cloudflare Pages serves this from the edge for
# free with no cold start. Kept working so the Cloud Run path is a real option
# rather than a claim.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json build.mjs check.mjs ./
COPY src ./src
COPY public ./public
RUN node build.mjs && node check.mjs

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Cloud Run injects PORT; nginx must listen on it.
CMD ["sh","-c","sed -i \"s/listen 8080/listen ${PORT:-8080}/\" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
