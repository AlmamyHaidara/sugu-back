pipeline {
	agent any
    tools {
		nodejs 'NodeJS'
    }
    stages {
		stage('Debug') {
			steps {
				sh 'node -v'
                sh 'npm -v'
                sh 'echo $PATH'
            }
        }
        stage('Install') {
			steps {
				sh 'npm install --force'
            }
        }
    }
}