FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 8080
EXPOSE 8081
CMD [ “npm”, “start” ]