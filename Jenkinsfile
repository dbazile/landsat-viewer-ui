library 'deployment'

pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'git://github.com/dbazile/landsat-viewer-ui'
            }
        }

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
