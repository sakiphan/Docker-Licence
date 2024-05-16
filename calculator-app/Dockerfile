# Temel imaj
FROM node:14

# Çalışma dizinini ayarla
WORKDIR /app

# Gerekli dosyaları kopyala
COPY package.json .
COPY calculator-app.js .
COPY public ./public

# Bağımlılıkları yükle
RUN npm install

# Uygulama başlangıcı için komut
CMD ["node", "calculator-app.js"]
