FROM node
WORKDIR /app

# Копируем package.json и package-lock.json, устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Открываем порт
EXPOSE 5173

# Запускаем dev-сервер при старте контейнера
CMD ["npm", "run", "dev"]
