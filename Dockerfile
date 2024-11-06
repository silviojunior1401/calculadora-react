# Estágio de build
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# Estágio de produção
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Configuração para roteamento do React
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]