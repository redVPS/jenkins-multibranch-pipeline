pipeline {
    environment {
        repository = 'thenaim/nodejs-app'
        registry = 'https://registry.hub.docker.com'
        registryCredential = 'dockerhub'
    }
    agent any
    options {
        // Skip default SCM checkout before clean up
        skipDefaultCheckout()
    }
    stages {
        stage('Build') {
            steps {
                // Clean before build
                cleanWs()
                // Checkout from SCM before build
                checkout scm
                script {
                    if (isMain()) {
                        // Build the Docker image with latest tag
                        dockerImage = docker.build "$repository:latest"
                    } else {
                        // Build the Docker image with BUILD_NUMBER tag
                        dockerImage = docker.build "$repository:$BUILD_NUMBER"
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run the tests inside container
                    // sh "docker run --rm $repository:$BUILD_NUMBER npm test"
                    dockerImage.inside {
                        // Extract the WORKDIR environment variable from container
                        def WORKDIR = sh(script: 'echo \$WORKDIR', returnStdout: true).trim()

                        // Copying the app into workspace
                        sh "cp -r '$WORKDIR' '$WORKSPACE'"

                        // Run the tests inside the new directory
                        dir("$WORKSPACE$WORKDIR") {
                            sh 'npm test'
                        }
                    // sh "rm -rf $WORKSPACE$WORKDIR"
                    }
                }
            }
        }
        stage('Deploy') {
            // Deploy if breach is main
            when { branch 'main' }
            steps {
                script {
                    docker.withRegistry("$registry", "$registryCredential") {
                        dockerImage.push()
                    }
                }
                echo 'Deployed!!!'
                // sh './bash/deploy.sh'
            }
        }
        stage('CleanUp') {
            steps {
                script {
                    // Removing the docker image
                    if (isMain()) {
                        sh "docker rmi $repository:latest"
                    } else {
                        sh "docker rmi $repository:$BUILD_NUMBER"
                    }
                }
            }
        }
    }
    post {
        // Triggere when blue or green sign
        success {
            echo 'Build was successful!! Notify team!'
        }
        // Triggere when red sign
        failure {
            echo 'Build is broken!! Notify team!'
        }
    }
}

def isMain() {
    "${BRANCH_NAME}" == 'main'
}
