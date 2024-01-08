#FROM node:18-alpine AS base
#
#RUN npm i -g pnpm
#
#FROM base AS dependencies
#
#WORKDIR /app
#COPY package.json ./
#RUN pnpm i
#
#FROM base AS build
#
#WORKDIR /app
#
#COPY . .
#
#COPY --from=dependencies /app/node_modules ./node_modules
#RUN pnpm build
#RUN pnpm prune --prod
#
#FROM nginx as deploy
#
#COPY --from=build /app/dist /usr/share/nginx/html/
#COPY --from=build /app/node_modules /usr/share/nginx/html/
#
#CMD ["nginx","-g","daemon off;"]

FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm i -g pnpm

RUN pnpm i

COPY . .

EXPOSE 80

CMD ["pnpm","run", "dev"]