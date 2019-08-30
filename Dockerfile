FROM node:latest
WORKDIR /app
RUN npm install -g @angular/cli -y 
ENTRYPOINT ["npm", "start"]