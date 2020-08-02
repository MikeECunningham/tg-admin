pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                ansiColor('xterm'){
                    sh 'docker-compose build'
                }
            }
        }
        stage('Test') {
            steps {
                ansiColor('xterm'){
                    sh 'docker-compose run webapp yarn test'
                }
            }
        }
        stage('Clean') {
            steps {
                ansiColor('xterm'){
                    sh 'docker-compose down --rmi local'
                }
            }
        }
    }
}