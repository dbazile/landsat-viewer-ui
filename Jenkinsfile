library 'deployment'

pipeline {
    agent {
        docker {
            image 'node:9.2'
            args '-e HOME=$HOME -v $HOME:$HOME -v /etc/passwd:/etc/passwd:ro'
        }
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh './scripts/lint.sh'
            }
        }

        stage('Deploy') {
            steps {
                deployApplication('landsat-viewer')
            }
        }
    }
}
