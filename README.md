# API CAD ASSEMBLIES [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Lipez-x/api-cad-assemblies/blob/main/LICENSE)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Nest](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)

Esta API foi criada para simplificar e otimizar o gerenciamento de membros, departamentos e congregações de uma igreja. Ela permite agilizar processos como ativação e inativação de membros, transferência entre congregações, alterações de departamentos e a gestão do histórico de posições ocupadas por cada membro.

## Estrutura do Projeto

A aplicação é dividida nos seguintes microsserviçoss:

1. **API Gateway**
   - Centraliza as requisições HTTP e as distribui para os microservices.
   - Gerencia autenticação e autorização.
   - Realiza validação inicial dos dados.
2. **Auth**
   - Gerencia o cadastro de usuários
   - Operações de recuperar senha
3. **Admin Backend**
   - Gerencia as operações de administradores
   - Responsável por gerenciar congregações e departamentos
4. **Members**
   - Gerenciar membros e históricos

## INSTRUÇÕES DE INSTALAÇÃO

### Pré-requisitos

[![Node version](https://img.shields.io/badge/node-v20.10.0-blue.svg)](https://shields.io/)
[![Npm version](https://img.shields.io/badge/npm-10.8.1-blue.svg)](https://shields.io/)
[![AWS-S3](https://img.shields.io/badge/AWS-S3-orange.svg)](https://shields.io/)
[![Rabbit](https://img.shields.io/badge/RabbitMQ-orange.svg)](https://shields.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-green.svg)](https://shields.io/)

### Etapas

#### 1. Clone o Repositório

```bash
git clone https://github.com/Lipez-x/api-cad-assemblies.git
cd api-cad-assemblies
```

#### 2. Instale as depêndencias

Navegue até cada pasta de microsserviços e no api-gateway e execute:

```bash
npm install
```

#### 3. Configurar variáveis de ambiente

Você pode criar um arquivo `.env` e adicionar as variáveis conforme necessário em cada microsserviços e no api-gateway. Aqui está um exemplo de como configurar essas variáveis:

###### .env

```.ts
// Configurações do RabbitMQ
RMQ_USER = rmq_user
RMQ_PASSWORD = rmq_password
RMQ_ADDRESS = rmq_address

// Configurações de JWT
JWT_SECRET= jwt_secret

// Configurações AWS
S3_USER_ACCESS_KEY_ID = s3_user_access_key_id
S3_USER_SECRET_ACCESS_KEY = s3_user_secret_access_key
AWS_REGION = aws_region
AWS_S3_BUCKET = aws_s3_bucket

// Configurações do banco de dados
DB_USER = root
DB_PASSWORD = password

// Configurações do SMTP
SMTP_HOST = smtp_host
SMTP_PORT = smtp_port
SMTP_USER = smtp_user
SMTP_PASSWORD = smtp_password
```

## INSTRUÇÕES DE USO

As instruções detalhadas de uso estão disponíveis na documentação do Swagger, que pode ser acessada no seguinte endpoint:

### Documentação

```
http://localhost:8080/api-docs/
```
