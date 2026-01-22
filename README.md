# gRPC Microservices Example

Este projeto demonstra a implementação de microserviços usando gRPC com Python e Node.js, além de um frontend para consumir os serviços.

## 🏗️ Arquitetura

O projeto consiste em:

- **User Service (Python)**: Microserviço para gerenciar usuários
- **Product Service (Node.js)**: Microserviço para gerenciar produtos
- **Frontend (Node.js + Express)**: Interface web para consumir os serviços gRPC
- **Docker Compose**: Orquestração de todos os serviços

## 📋 Pré-requisitos

- Docker
- Docker Compose

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone <repository-url>
cd gRPC-example
```

2. Inicie todos os serviços com Docker Compose:

```bash
docker-compose up --build
```

3. Acesse o frontend em: http://localhost:3000

## 🔌 Serviços e Portas

- **User Service (Python)**: porta 50051
- **Product Service (Node.js)**: porta 50052
- **Frontend**: porta 3000

## 📚 Funcionalidades

### User Service

- `CreateUser`: Criar novo usuário
- `GetUser`: Buscar usuário por ID
- `ListUsers`: Listar todos os usuários
- `UpdateUser`: Atualizar dados do usuário
- `DeleteUser`: Deletar usuário

### Product Service

- `CreateProduct`: Criar novo produto
- `GetProduct`: Buscar produto por ID
- `ListProducts`: Listar todos os produtos
- `UpdateProduct`: Atualizar dados do produto
- `DeleteProduct`: Deletar produto

## 🛠️ Tecnologias Utilizadas

- **gRPC**: Framework de RPC de alta performance
- **Protocol Buffers**: Serialização de dados
- **Python**: Linguagem para User Service
- **Node.js**: Linguagem para Product Service e Frontend
- **Express**: Framework web para o frontend
- **Docker**: Containerização
- **Docker Compose**: Orquestração de containers

## 📁 Estrutura do Projeto

```
gRPC-example/
├── user-service/          # Microserviço Python
│   ├── proto/
│   ├── server.py
│   ├── requirements.txt
│   └── Dockerfile
├── product-service/       # Microserviço Node.js
│   ├── proto/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/              # Frontend Node.js
│   ├── public/
│   ├── views/
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔍 Detalhes dos Serviços

### User Service (Python)

Implementado usando `grpcio` e `grpcio-tools`. Armazena dados em memória (pode ser facilmente substituído por um banco de dados).

**Endpoint gRPC**: `localhost:50051`

### Product Service (Node.js)

Implementado usando `@grpc/grpc-js` e `@grpc/proto-loader`. Armazena dados em memória.

**Endpoint gRPC**: `localhost:50052`

### Frontend

Interface web simples construída com Express.js que se comunica com os microserviços via gRPC.

**URL**: http://localhost:3000

## 🧪 Testando Manualmente

Você pode testar os serviços gRPC usando ferramentas como:

- **grpcurl**: Cliente gRPC via linha de comando
- **BloomRPC**: Cliente GUI para gRPC
- **Postman**: Suporta gRPC a partir da versão 8.0

Exemplo com grpcurl:

```bash
# Listar serviços disponíveis
grpcurl -plaintext localhost:50051 list

# Criar usuário
grpcurl -plaintext -d '{"name": "João Silva", "email": "joao@example.com"}' \
  localhost:50051 user.UserService/CreateUser

# Listar usuários
grpcurl -plaintext -d '{}' localhost:50051 user.UserService/ListUsers
```

## 📖 Aprendendo mais sobre gRPC

- [Documentação Oficial gRPC](https://grpc.io/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [gRPC Python](https://grpc.io/docs/languages/python/)
- [gRPC Node.js](https://grpc.io/docs/languages/node/)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.
