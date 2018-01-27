pipeline {
  agent any
  stages {
    stage('cnpm install') {
      steps {
        sh 'cnpm install'
      }
    }
    stage('cnpm run build:prod') {
      steps {
        sh 'cnpm run build:prod'
      }
    }
    stage('package') {
      steps {
        sh 'mv dist genesis;tar -zcvf genesis.tar.gz'
      }
    }
    stage('') {
      steps {
        archiveArtifacts 'genesis.tar.gz'
      }
    }
  }
}