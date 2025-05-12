pipeline {
	agent any
	tools {
		nodejs 'NodeJS'
    }
    environment {
		NODE_ENV = 'production'
        IMAGE_NAME = 'almamyhaidara159/sugu-back-nestjs'  // Ton image Docker
        IMAGE_TAG = 'latest'
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials-id' // ID des credentials Docker Hub dans Jenkins
        K8S_CLUSTER = 'your-kubernetes-cluster' // Nom de ton cluster Kubernetes
    }

    stages {
		stage('Kubernetes test') {
			steps {
				withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
					sh 'kubectl get pods'
                }
            }
        }
        stage('Checkout Git Branch') {
			steps {
				echo 'Clonage du dépôt Git sugu-back.git'
				git(
                    branch: 'main',
                    url:'https://github.com/AlmamyHaidara/sugu-back.git',
                    credentialsId: '0d501e9b-37ae-44ef-9ccf-42d34a9cfe8c'
                )
            }
        }

		stage('Setup Environment') {
				steps {
					withCredentials([file(credentialsId: 'SUGU_ENV_FILE', variable: 'ENV_FILE_PATH')]) {
						// Copier le fichier .env dans le répertoire de travail
                    sh 'cp $ENV_FILE_PATH .env'
                }
            }
        }
        stage('Build') {
			steps {
				echo 'Installation des dépendances, build du projet, et génération de la base de données...'
                sh '''
                    npm install -g @nestjs/cli &&
                    npm install --force &&
                    npm run build &&
                    npx prisma generate
                '''
            }
        }

        stage('Docker Build and Push') {
			steps {
				script {
					echo 'Construction de l\'image Docker...'
                    sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."

                    echo 'Connexion à Docker Hub...'
					withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CREDENTIALS', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
									sh '''
							echo "Connexion avec l'utilisateur: $DOCKER_USERNAME"
							echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
						'''
					}

                    script {
						echo 'Pusher l\'image vers Docker Hub...'
							def gitCommit = env.GIT_COMMIT ? env.GIT_COMMIT.substring(0, 7) : sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
						def imageTag = "${IMAGE_NAME}:${env.BUILD_NUMBER}-${gitCommit}"
						echo "Publication de l'image : ${imageTag}"
						sh "docker push ${imageTag}"
						if (env.BRANCH_NAME == 'main') {
								echo "Publication du tag 'latest'..."
							sh "docker push ${IMAGE_NAME}:latest"
						}
                	}
                }
            }
        }

        stage('Deploy to Kubernetes') {
			steps {
				script {
					echo 'Déploiement sur Kubernetes...'

                    // Applique le fichier de déploiement Kubernetes
                    sh 'kubectl apply -f .'

                    // Si tu veux scaler ton déploiement
                    // sh 'kubectl scale deployment nestjs-app --replicas=3'

                    // Optionnel: Vérifier que le pod est bien déployé
                    sh 'kubectl get pods'
                }
            }
        }
    }

    post {
		always {
			sh 'rm -f .env'
			echo 'Pipeline terminé.'
        }
        failure {
			echo 'Le pipeline a échoué.'
        }
    }
}
