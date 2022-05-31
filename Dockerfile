# base image
FROM alpine
RUN apk add --update nodejs npm

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build
CMD ["npm", "run", "start"]