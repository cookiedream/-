# 使用 Node.js 14 作為基礎映像檔
FROM node:latest

# 在映像檔中創建一個工作目錄
WORKDIR /app

# 將 package.json 和 package-lock.json 複製到映像檔中
COPY package*.json ./

# 在映像檔中安裝 Node.js 相依套件
RUN npm install

# 將應用程式的源代碼複製到映像檔中
COPY . .

# 定義 Mongoose 容器所需的環境變數
ENV MONGO_URI mongodb://mongo:27017/mernDB

# 定義容器所需公開的端口
EXPOSE 8080

# 啟動 Mongoose 應用程式
CMD [ "npm", "start" ]
