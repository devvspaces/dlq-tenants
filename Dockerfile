FROM node:lts-alpine3.19
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm","run","dev" ]
