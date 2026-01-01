FROM node:20-slim

WORKDIR /app

# copy lock + package first to leverage cache
COPY package*.json ./

RUN npm ci

# copy rest
COPY . .

# Environment recommended for polling
ENV CHOKIDAR_USEPOLLING=true
ENV CHOKIDAR_INTERVAL=1000
ENV WATCHPACK_POLLING=true
ENV WATCHPACK_FORCE_POLLING=true
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# start next on 0.0.0.0 so container port mapping works
CMD ["npm", "run", "dev"]

