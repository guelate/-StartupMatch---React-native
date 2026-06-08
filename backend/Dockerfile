FROM node:20-alpine AS builder

WORKDIR /app 

COPY package*.json ./

RUN npm install

#Copy source code after npm install for Docker cache
COPY . . 

RUN npm run build

#Stage 2 for production 
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

#Install only dependance for production 
RUN npm install --production

#Copy compiled output from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]