FROM node:alpine
RUN  mkdir -p /root/blog
WORKDIR   /root/blog
COPY  . .
RUN     npm install
EXPOSE 3000
CMD  ["node","app.js"]