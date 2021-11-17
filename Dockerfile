FROM node:lts-alpine
WORKDIR /budget-tracker-frontend
COPY package*.json /budget-tracker-frontend/
RUN npm install
COPY . /budget-tracker-frontend/
EXPOSE 3000
CMD ["npm", "start"]