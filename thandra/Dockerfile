FROM node:10

WORKDIR /usr/src/app

COPY . .

# RUN mkdir common/logger/log
RUN npm i

EXPOSE 5000

RUN node --version
CMD ["npm", "start"]