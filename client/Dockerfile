# 使用 Node.js 官方的 Node 映像作為基礎
FROM node:14-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 到工作目錄
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製應用程式程式碼到工作目錄
COPY . .

# 執行建置指令（根據你的需求進行修改）
RUN npm run build

# 設定容器執行的指令
CMD ["npm", "start"]
