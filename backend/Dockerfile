FROM node:20-alpine AS builder

WORKDIR /app 

COPY package*.json ./

RUN npm install

#Copy source code after npm install for Docker cache
#after each push if package.json or package-lock.json is not changed, Docker will use the cache and skip npm install step
#we copy just source code changed
COPY . . 

# Generate Prisma client before building
RUN npx prisma generate 

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