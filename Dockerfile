FROM node:22-alpine

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

CMD ["npm", "run", "start:dev"]