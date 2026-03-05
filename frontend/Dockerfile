FROM node:22-alpine
# ติดตั้ง pnpm ก่อน
RUN npm install -g pnpm

WORKDIR /app
COPY pnpm-lock.yaml* package.json ./
RUN pnpm install

COPY . . 

EXPOSE 5173

CMD ["npm", "run", "dev"]