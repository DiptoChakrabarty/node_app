#!/bin/bash
kubectl apply -f kube
kubectl scale --replicas=2 deployment/blog
kubectl get pods -l app=knote --watch