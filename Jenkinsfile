pipeline {
    environment {
        repository = 'thenaim/jenkins-nodejs-app'
        registryUrl = 'https://registry.hub.docker.com'
        registryCredentialsId = 'dockerhub'
    }
    agent any
    options {
        skipDefaultCheckout()   // Skip default SCM checkout
    }
    stages {
        stage('Checkout SCM') {
            steps {
                script{
                    cleanWs()       // Clean before build
                    checkout scm    // Checkout from SCM before build
                }
            }    
        }
        stage("Build Application") {
            steps {
                script {
                    if (isMain()) {
                        build_latest()
                    } 
                    else {
                        build_number()
                    }
                }
			}
        }
        stage('Test Application') {
            steps {
                script {
                    // sh "docker run --rm $repository:$BUILD_NUMBER npm test"                      // Run the tests inside container
                    dockerImage.inside {
                        def WORKDIR = sh(script: 'echo \$WORKDIR', returnStdout: true).trim()       // Extract the WORKDIR environment variable from container
                        sh "cp -r '$WORKDIR' '$WORKSPACE'"                                          // Copying the app into workspace
                        dir("$WORKSPACE$WORKDIR") {
                            sh 'npm test'                                                           // Run the tests inside the new directory
                        }
                    }
                }
            }
        }
        stage('Publish Artifacts') {
            when { 
                branch 'multi'
            }
            steps {
                publish()
                echo 'Published!!!'
            }
        }
        stage('Clean Up') {
			steps {
				script {
                    if (isMain()) {
                        sh "docker rmi $repository:latest"
                    } 
                    else {
                        sh "docker rmi $repository:$BUILD_NUMBER"
                    }
                }
			}
        }
    }
    post {
        success {
            echo 'Build was successful!! Notify team!'
        }
        failure {
            echo 'Build is broken!! Notify team!'
        }
    }
}

def isMain() {
    "${BRANCH_NAME}" == 'multi'
}

def build_number() {
    dockerImage = docker.build "$repository:$BUILD_NUMBER"
}

def build_latest() {
    dockerImage = docker.build "$repository:latest"
}

def publish() {
    docker.withRegistry("$registryUrl", "$registryCredentialsId") {
        dockerImage.push()
    }
}
