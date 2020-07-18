FROM node:lts-alpine3.12 as imageBuilder
LABEL author="danijel.fon@gmail.com"
WORKDIR '/app'
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM node:current-alpine3.12
COPY --from=imageBuilder /app/build /
COPY package.json .
RUN yarn install --production
EXPOSE 8030/tcp
ENTRYPOINT ["node","./index.js"]


