FROM node:lts-alpine as build-stage

# Configure Vue App Environment Variables
ARG SHIFTER_API_HOSTNAME
ENV VITE_SHIFTER_API_HOSTNAME=$SHIFTER_API_HOSTNAME

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
#FROM nginx as production-stage
#COPY --from=build-stage /app/dist /usr/share/nginx/html
#EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]

# nginx state for serving content
FROM nginx:alpine as production-stage
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=build-stage /app/dist .
# Containers run nginx with global directives and daemon off
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]