# create Docker file
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install


ENV SERVICE_NAME='MusicShop API Service'
ENV DATABASE_URL="mysql://root:@localhost:3306/pkw"
ENV SERVER_PORT=3000
ENV CORS_ORIGINS=https://musicshop.aona.dev,http://localhost:5173
ENV CORS_CREDENTIALS=1
ENV CORS_METHODS=GET,POST,PUT,PATCH,HEAD,DELETE,OPTIONS
ENV CORS_ALLOW_HEADERS=Content-Type,Accept

# BUILD ts to js
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]