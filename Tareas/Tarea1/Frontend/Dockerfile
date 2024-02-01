From node:18.13-alpine

WORKDIR /frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . ./

EXPOSE 5173

CMD ["yarn","dev"]

