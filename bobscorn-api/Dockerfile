FROM node:22

# Create app directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

CMD [ "npm" , "run" , "migrate-db"]

