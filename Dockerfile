FROM node:alpine AS build
RUN apk add --no-cache openssl

WORKDIR /usr/src/product
COPY package*.json ./
RUN npm install -g npm@11.1.0
RUN npm i --save-dev prisma@latest
RUN npm i @prisma/client@latest
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:alpine
WORKDIR /usr/src/product
COPY --from=build /usr/src/product/dist ./dist
COPY --from=build /usr/src/product/node_modules ./node_modules
COPY --from=build /usr/src/product/package*.json ./
COPY --from=build /usr/src/product/prisma ./prisma
COPY --from=build /usr/src/product/entrypoint.sh ./
RUN apk add --no-cache openssl
RUN npm i --save-dev prisma@latest
RUN npm i @prisma/client@latest
RUN chmod +x entrypoint.sh
EXPOSE 3000
CMD ["sh", "entrypoint.sh"]
