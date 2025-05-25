FROM node:22-alpine

COPY package.json package-lock ./

RUN npm ci

CMD ["npm", "run", "start:dev"]