#!/bin/bash

resource_type="$1"
branch="$2"

cd k8s

pwd

config_name="${branch}-${resource_type}"

config_path="${resource_type}s/${config_name}.yaml"

if kubectl get deployment "frontend-$config_name" &> /dev/null; then
    kubectl rollout restart deployment "frontend-$config_name"
else
    kubectl apply -f "$config_path"
fi

if [ "$resource_type" == "service" ]; then
    echo "Waiting external ip for 40 secconds..."
    sleep 40s
    echo "40 secconds have passed !"
    kubectl get service "frontend-$config_name"
fi
