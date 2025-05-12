pipeline {
	agent any

    environment {
		NODE_ENV = 'production'
        IMAGE_NAME = 'almamyhaidara/mon-projet-nestjs'  // Ton image Docker
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
		//stage('Clone') {
		//	steps {
		//		echo 'Clonage du dépôt Git sugu-back.git'
        //        git 'https://github.com/AlmamyHaidara/sugu-back.git'
        //    }
        //}

        stage('Build') {
			steps {
				echo 'Installation des dépendances...'
                sh 'npm install --force'

                echo 'Build du projet sugu-back...'
                sh 'npm run build'

                echo 'Génération de la base de données avec Prisma...'
                sh 'npx prisma db push && npx prisma generate'
            }
        }

        stage('Docker Build and Push') {
			steps {
				script {
					echo 'Construction de l\'image Docker...'
                    sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."

                    echo 'Connexion à Docker Hub...'
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
						sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                    }

                    echo 'Pusher l\'image vers Docker Hub...'
                    sh "docker push $IMAGE_NAME:$IMAGE_TAG"
                }
            }
        }

        stage('Deploy to Kubernetes') {
			steps {
				script {
					echo 'Déploiement sur Kubernetes...'

					// Change directory
					sh 'cd k8s'

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
			echo 'Pipeline terminé.'
        }
        failure {
			echo 'Le pipeline a échoué.'
        }
    }
}
