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
        stage('Build Application') {
            when { not { branch 'main' }}
			steps {
                script {
				    build_number()
                }
			}
            when { branch 'main' }
            steps {
                script {
				    build_latest()
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
            when { branch 'main' }
            steps {
                publish()
                echo 'Published!!!'
            }
        }
        stage('CleanUp') {
            when { not { branch 'main' }}
			steps {
				sh "docker rmi $repository:$BUILD_NUMBER"
			}
            when { branch 'main' }
            steps {
				sh "docker rmi $repository:latest"
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