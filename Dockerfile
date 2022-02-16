FROM node:lts-alpine as build-stage

# Configure Vue App Environment Variables
#ARG WEB_UI_GTA_KEY
#ENV VITE_GTA_KEY=$WEB_UI_GTA_KEY

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]