#!/bin/bash
kubectl apply -f kube
kubectl scale --replicas=2 deployment/blog
kubectl get pods -l app=blog --watch
minikube service blog



# List of Commands
#Master Node
kubeadm init --apiserver-advertise-address $(hostname -i)

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config


# ADD USER
useradd dipto -G sudo -m -s /bin/bash
passwd dipto

cd $HOME
sudo cp /etc/kubernetes/admin.conf $HOME/
sudo chown $(id -u):$(id -g) $HOME/admin.conf
export KUBECONFIG=$HOME/admin.conf
echo "export KUBECONFIG=$HOME/admin.conf" | tee -a ~/.bashrc

# Check master node status
kubectl get pods -n kube-system


# Save Token 
kubeadm token create --print-join-command
kubeadm join 192.168.0.18:6443 --token rppnz7.rpsfyr44zh6ookc4     --discovery-token-ca-cert-hash sha256:00414fa1eab8fe5784f4d03baa5a1a13139f8cde6f6b1d5610ce92e713048600