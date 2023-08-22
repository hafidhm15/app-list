pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your source code from the repository
                checkout scm
            }
        }

        stage('Install and Build') {
            steps {
                // Navigate to the React.js app directory
                dir('C:/Users/HP/Documents/cicd/app-list') {
                    // Install dependencies
                    bat 'npm install'
                    
                    // Build the React.js app
                    bat 'npm run build'
                }
            }
        }
        
        // You can add more stages as needed
    }

    post {
        success {
            echo 'Pipeline succeeded! You can add notifications or other actions here.'
        }
        failure {
            echo 'Pipeline failed! You can take specific actions for failure cases here.'
        }
    }
}
