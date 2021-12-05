FROM node:14
WORKDIR /proyectofinal
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev"]