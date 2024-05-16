# Temel imaj
FROM node:14
WORKDIR /app
COPY package.json .
COPY calculator-app.js .
COPY public ./public
RUN npm install
CMD ["node", "calculator-app.js"]
