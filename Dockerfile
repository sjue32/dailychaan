FROM node:16.14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . ./
COPY ./src/client/components/NavBar.tsx ./src/client/components
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
