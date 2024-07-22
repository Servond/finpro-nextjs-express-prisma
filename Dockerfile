FROM node:20

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && \
  apt-get install -y bash git openssl

COPY package*.json ./

# Husky
RUN npm install husky -g && npm install --ignore-scripts

COPY . .

RUN ["npm", "run", "build"]

EXPOSE 3001

VOLUME ["/app/node_modules"]

CMD [ "npm", "run", "serve" ]
