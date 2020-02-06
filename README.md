# Blog_App

- A Simple Web App which allows users to add their blogs.
- Users can add modify and comment on their blogs
- Authentication system is also enabled
- Project made using node.js and MongoDb
- The project has been deployed using Docker
- App has been scaled using Kubernetes


## Tech Stack Used

- Node.js
- MongoDb
- Docker 
- Docker Compose
- Kubernetes

### How to Run Project

#### Locally using node
```
- Clone Project
- Enter project directory and run npm install
- Run node  app.js
- Server has started at port 3000
```

### Run using Docker
```
- Ensure docker and docker-compose is installed 
- [Install docker on ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04)
- Start services of docker and enable them
- [Install docker compose](https://linuxize.com/post/how-to-install-and-use-docker-compose-on-ubuntu-18-04/)
- There are two files a Dockerfile and docker-compose.yml
- Dockerfile is used to create docker image
- To run application run docker-compose up -d 
- Go to localhost:3000
