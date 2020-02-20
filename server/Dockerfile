FROM mhart/alpine-node:12.14.1

RUN npm config set registry https://registry.npm.taobao.org/
WORKDIR /server
COPY package*.json ./

ARG NODE_ENV=development
COPY ./install.sh ./install.sh
RUN ./install.sh

COPY . .