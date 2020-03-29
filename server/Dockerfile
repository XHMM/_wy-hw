FROM mhart/alpine-node:12.14.1

RUN npm config set registry https://registry.npm.taobao.org/
WORKDIR /server
COPY package*.json ./

ARG NODE_ENV=development
COPY ./install.sh ./install.sh
RUN chmod +x ./install.sh # 在linux下运行时还是得显示加上这么一句
RUN ./install.sh

COPY . .
