# Kubernetes Demo Project

A simple demonstration of Kubernetes core concepts for educational purposes. This demo showcases deployments, scaling, self-healing, and rolling updates using a basic web application.

## Prerequisites

- macOS
- Docker Desktop
- kubectl
- Minikube

## Part 1: Install Project

### Start Your Local Kubernetes Cluster

```bash
minikube start
minikube status
```

### Project Setup

```bash
# Configure shell to use Minikube's Docker daemon
eval $(minikube docker-env)

# Build the Docker image
cd app
docker build -t demo-app:v1 .
cd ..

# Deploy the application to Kubernetes
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Verify the pod is running
kubectl get pods

# Open the application in your browser
minikube service demo-app-service
```

## Part 2: Demonstration Guide

### Feature 1: Application Basics

- The application shows a counter that increments with each refresh
- It displays the hostname of the container it's running on
- Note the "Status: v1" message at the bottom

### Feature 2: Scaling

Demonstrate how Kubernetes handles increased load by scaling up:

```bash
# Scale to multiple replicas
kubectl scale deployment/demo-app --replicas=3

# View the new pods being created
kubectl get pods

# Wait until all show "Running" status
```

Refresh the browser several times to see requests being served by different pods (the hostname changes).

### Feature 3: Self-Healing

Show how Kubernetes automatically recovers from failures:

```bash
# List the running pods
kubectl get pods

# Delete one pod (replace with an actual pod name)
kubectl delete pod demo-app-xxxxxxxx-xxxx

# Watch Kubernetes automatically create a replacement
kubectl get pods
```

Refresh the browser to show the application continues to function.

### Feature 4: Rolling Updates

Demonstrate how Kubernetes updates applications without downtime:

```bash
# Create an updated version
cd app
# Edit server.js to change "Status: v1 - Running normally" to "Status: v2 - Updated version"
# Build the new version
docker build -t demo-app:v2 .
cd ..

# Update the deployment to use the new image
# Edit deployment.yaml to change "image: demo-app:v1" to "image: demo-app:v2"
kubectl apply -f deployment.yaml

# Watch the rolling update
kubectl rollout status deployment/demo-app

# Verify the pods are updated
kubectl get pods
```

Refresh the browser to see the new "v2" status message.

## Cleaning Up

When finished with the demo:

```bash
# Delete the deployed resources
kubectl delete -f deployment.yaml
kubectl delete -f service.yaml

# Stop Minikube (optional)
minikube stop
```

## Repository Structure

```
kubernetes-demo/
├── README.md
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── deployment.yaml
└── service.yaml
```
