#!/usr/bin/env groovy
pipeline {
    agent {
        label 'master'
    }

    stages {
        stage('build parallel') {
            parallel {                                
              
								stage ('ADMIN TAO Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['TAO_SANDBOX']) {
								            sh """ssh -v   ubuntu@35.180.235.164 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['TAO_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - TAO SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN TAO Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['TAO_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@15.236.72.168 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['TAO_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - TAO RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN KAPORAL Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['KAPORAL_SANDBOX']) {
								            sh """ssh -v   ubuntu@15.188.149.36 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['KAPORAL_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - KAPORAL SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN KAPORAL Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['KAPORAL_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@15.188.130.49 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['KAPORAL_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - KAPORAL RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN LAREDOUTE Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['LAREDOUTE_SANDBOX']) {
								            sh """ssh -v   ubuntu@52.47.178.225 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['LAREDOUTE_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - LAREDOUTE SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN LAREDOUTE Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['LAREDOUTE_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@35.180.220.38 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['LAREDOUTE_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - LAREDOUTE RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN ORCHESTRA Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['ORCHESTRA_SANDBOX']) {
								            sh """ssh -v   ubuntu@15.236.63.184 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['ORCHESTRA_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - ORCHESTRA SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN ORCHESTRA Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['ORCHESTRA_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@13.36.27.175 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['ORCHESTRA_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - ORCHESTRA RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN CYRILLUS Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['CYRILLUS_SANDBOX']) {
								            sh """ssh -v   ubuntu@15.236.245.156 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['CYRILLUS_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - CYRILLUS SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN CYRILLUS Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['CYRILLUS_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@15.237.129.85 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['CYRILLUS_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - CYRILLUS RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN THEBRADERY Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['THEBRADERY_SANDBOX']) {
								            sh """ssh -v   ubuntu@13.37.156.203 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['THEBRADERY_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - THEBRADERY SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN THEBRADERY Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['THEBRADERY_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@13.37.189.251 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['THEBRADERY_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - THEBRADERY RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN CULTURA Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['CULTURA_SANDBOX']) {
								            sh """ssh -v   ubuntu@13.37.72.150 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['CULTURA_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - CULTURA SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN CULTURA Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['CULTURA_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@15.236.191.224 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['CULTURA_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - CULTURA RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN PICWIC Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['PICWIC_SANDBOX']) {
								            sh """ssh -v   ubuntu@15.236.187.203 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['PICWIC_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - PICWIC SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN PICWIC Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['PICWIC_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@35.181.18.85 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['PICWIC_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - PICWIC RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN CLOZEN Deployment SANDBOX') {
								    when {
								      allOf {
								        tag "back-SANDBOX-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['CLOZEN_SANDBOX']) {
								            sh """ssh -v   ubuntu@35.180.145.31 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout dev &&
								            git pull origin dev &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['CLOZEN_SANDBOX']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - CLOZEN SANDBOX"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								

								stage ('ADMIN CLOZEN Deployment RECETTE') {
								    when {
								      allOf {
								        tag "back-PREPROD-*"
								      }
								    }
								    steps{
								        sshagent(credentials : ['CLOZEN_RECETTE']) {
								            sh """ssh -v -o StrictHostKeyChecking=no  ubuntu@35.180.145.6 << EOF
								            cd /home/ubuntu/api/app/back/files &&
								            git reset HEAD --hard &&
								            git checkout master &&
								            git pull origin master &&
								            cd /home/ubuntu/api &&
								            docker-compose up -d --build back &&
								            exit
								            EOF
								            """
								        }
								        sshagent(credentials : ['CLOZEN_RECETTE']) {
								            sh """curl -s -d 'payload={"channel": "#notifications", "text": "Publication ADMIN - CLOZEN RECETTE"}' 'https://hooks.slack.com/services/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'"""
								        }
								    }
								}
								
            }
        }
    }
}
