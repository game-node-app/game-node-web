FROM node:18

# Create app directory
WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 3000

CMD yarn start