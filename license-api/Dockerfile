# Temel imaj
FROM node:14
WORKDIR /app
COPY package.json .
COPY license-api.js .
RUN echo '{}' > start_time.json
RUN npm install
CMD ["node", "license-api.js"]
