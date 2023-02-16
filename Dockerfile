# chuan bi moi truong de chay container
FROM node:18-alpine
# tao folder app in root
WORKDIR /app
# copy all source code into app folder
COPY . .
# run yarn
RUN yarn install --production
# huong dan docker run image
CMD ["node", "src/index.js"]
# expose port 3001
EXPOSE 3001

# create container, use key word build 
# docker build -t getting-started .
# -t: flags tab | name: getting-started | .: build process docker at current link

