FROM node:lts-alpine
WORKDIR /budget-tracker-frontend
COPY package*.json /
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]