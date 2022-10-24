FROM node:lts as dependencies

WORKDIR /src/chatapp
COPY package.json package-lock.json ./
RUN npm install

FROM node:lts as builder

RUN npm run build


WORKDIR /src/chatapp
COPY . /src/chatapp
COPY --from=dependencies /src/chatapp/node_modules ./node_modules
