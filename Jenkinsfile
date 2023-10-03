pipeline {
    agent any

    tools {
        maven 'my-node-18.18.0'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
    }

    parameters {
        choice(name: 'BUILD_ENV', choices: ['sit', 'uat', 'prod'], description: 'Select the target environment for deployment')
    }

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = credentials('gcloud-creds')
        GOOGLE_CLOUD_KEYFILE_JSON = credentials('gcloud-creds')
        DOCKERHUB_CREDS = credentials('dockerhub')
        DOCKER_IMAGE_NAME = 'quachuoiscontainer/hph_be'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        CLUSTER_NAME = "haikn2-cicd-${BUILD_ENV}-cluster"
        PROJECT_ID = 'knhfrdevops'
        LOCATION = 'asia-east2-a'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build with npm') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Static Code Analysis with SonarQube') {
            steps {
                withSonarQubeEnv('my-sonar') {
                    sh 'npm install -g sonarqube-scanner'
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Package with Docker') {
            steps {
                script {
                    sh 'docker --version'
                    sh "docker build -t ${DOCKER_IMAGE_NAME} ."
                }
            }
        }

        stage('Scan with Trivy') {
            steps {
                sh 'trivy --version'
                sh 'trivy image ${DOCKER_IMAGE_NAME}'
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    sh 'docker --version'
                    sh 'echo $DOCKERHUB_CREDS'
                    sh 'echo $DOCKERHUB_CREDS_PSW | docker login -u $DOCKERHUB_CREDS_USR --password-stdin'
                    sh "docker push ${DOCKER_IMAGE_NAME}"
                    sh "docker rmi ${DOCKER_IMAGE_NAME}"
                }
            }
        }

        stage('Get GKE Cluster credetials') {
            steps {
                sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                sh 'gcloud container clusters get-credentials ${CLUSTER_NAME} --zone=${LOCATION}'
                sh 'kubectl cluster-info'
            }
        }

        stage('Deploy to GKE ${BUILD_ENV}') {
            steps {
                sh 'bash k8s/run.sh service ${BUILD_ENV}'
                sh 'kubectl cluster-info'
            }
        }

        stage('Deploy to PRODUCTION') {
            when {
                expression { params.BUILD_ENV == 'prod' }
            }
            steps {
                input message: 'Deploy to production? Confirm deployment.', ok: 'Deploy'
            }
        }
    }

    post {
        success {
            echo 'Build and analysis completed successfully.'
        // You can trigger notifications, alerts, or other post-build actions here
        }
        failure {
            echo 'Build and analysis failed. Please investigate and fix the issues.'
        // You can trigger notifications, alerts, or other post-failure actions here
        }
    }
}
