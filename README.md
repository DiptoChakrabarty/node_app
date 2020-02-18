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
- Start services of docker and enable them
- There are two files a Dockerfile and docker-compose.yml
- Dockerfile is used to create docker image
- To run application run docker-compose up -d 
- Go to localhost:3000

```

### Run using Kubernetes

#### Minikube
```
- Ensure you have minikube installed
- All kubernetes files are present in kube folder
- Run kubectl apply -f kube 
- This creates all the pods required
- Check pods status using kubectl get pods

```

#### Cluster
----

- In master node 
    * kubeadm init --apiserver-advertise-address $(hostname -i)
    * mkdir -p $HOME/.kube
    * sudo cp /etc/kubernetes/admin.conf $HOME/
    * sudo chown $(id -u):$(id -g) $HOME/admin.conf
    * export KUBECONFIG=$HOME/admin.conf
    * echo "export KUBECONFIG=$HOME/admin.conf" | tee -a ~/.bashrc

````


