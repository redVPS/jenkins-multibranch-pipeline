

A quick Jenkins guide for setting up declarative CI/CD pipeline with docker and nodejs.



## Quickstart



### Installing Jenkins

Two way you can install jenkins server, either use docker container or direct installation on OS.

- Docker - [Follow this article for docker inside docker for jenkins](https://itnext.io/docker-inside-docker-for-jenkins-d906b7b5f527)

  ```bash
  docker run -d -v jenkins_home:/var/jenkins_home -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
  ```

- Debian | Ubuntu

  ```bash
  sudo apt update
  sudo apt install openjdk-11-jdk
  wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
  sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
  sudo apt-get update
  sudo apt-get install jenkins
  ```

  Jenkins root permission

  ```bash
  sudo usermod -a -G root jenkins
  ```

  

### Install services

- Docker

  ```bash
  sudo sh -c "$(curl -fsSL https://get.docker.com)"
  sudo usermod -aG docker jenkins
  newgrp docker
  ```
  Note: Sometimes reboot required

- NPM

  ```bash
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  ```

  

### Install Jenkins Plugin

- [Workspace Cleanup Plugin](https://plugins.jenkins.io/ws-cleanup)
- [Docker Plugin](https://plugins.jenkins.io/docker-plugin)
- [Docker Pipeline](https://plugins.jenkins.io/docker-workflow)
- [Blue Ocean](https://plugins.jenkins.io/blueocean)
- [NodeJS Plugin](https://plugins.jenkins.io/nodejs)



### Configure Jenkins

- Check docker and nodejs service whether installed not it `Manage Jenkins` -> `Global Tool Configuration`

  ![](https://i.imgur.com/XKoODMD.png)

  ![](https://i.imgur.com/QwoAbZg.png)

- Add GitHub and DockerHub Credentials `Manage Jenkins` -> `Credentials`

  

### Build

- Configure GitHub repo
- `Build Now`
