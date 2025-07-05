FROM node:22-alpine AS base
USER node
WORKDIR /app
COPY package.json package-lock.json  ./
RUN npm ci
COPY --chown=node:node . .

FROM base AS development
CMD ["npm", "run", "start:dev"]

FROM base AS production
RUN npm run build
CMD ["npm", "run", "start:prod"]