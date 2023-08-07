FROM node:gallium-alpine

ENV NODE_ENV=production

ENV PORT=4000

WORKDIR /usr/app

COPY ./ ./

RUN yarn

EXPOSE 4000

CMD ["yarn", "start"]