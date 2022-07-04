# Build
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN yarn install && yarn build

# Deploy
FROM nginx:1.23.0-alpine
COPY --from=build /app/public /usr/share/nginx/html
