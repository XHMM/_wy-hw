FROM mhart/alpine-node:12.14.1

RUN npm config set registry https://registry.npm.taobao.org/
WORKDIR /client
COPY package*.json ./
RUN npm i

COPY . .
