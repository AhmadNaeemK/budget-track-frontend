FROM node:lts-alpine
ENV REACT_APP_BACKEND_API=127.0.0.1:8000
WORKDIR /budget-tracker-frontend
COPY package*.json /budget-tracker-frontend/
RUN npm install
COPY . /budget-tracker-frontend/
EXPOSE 3000
CMD ["npm", "start"]