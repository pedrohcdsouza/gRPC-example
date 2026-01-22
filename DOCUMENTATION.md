# Documentação Técnica - gRPC Microservices

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Protocol Buffers](#protocol-buffers)
4. [User Service (Python)](#user-service-python)
5. [Product Service (Node.js)](#product-service-nodejs)
6. [Frontend](#frontend)
7. [Docker e Deploy](#docker-e-deploy)
8. [Testes](#testes)

## Visão Geral

Este projeto demonstra uma arquitetura de microserviços usando gRPC, um framework RPC (Remote Procedure Call) de alta performance desenvolvido pelo Google. O gRPC usa Protocol Buffers como linguagem de definição de interface e formato de serialização de dados.

### Por que gRPC?

- **Performance**: Usa HTTP/2 e Protocol Buffers para comunicação eficiente
- **Tipagem Forte**: Contratos de API bem definidos
- **Multi-linguagem**: Suporte nativo para várias linguagens
- **Streaming**: Suporte para streaming bidirecional
- **Geração de Código**: Cliente e servidor gerados automaticamente

## Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                     Frontend                         │
│              (Node.js + Express)                    │
│                   Port: 3000                        │
└────────────┬──────────────────────┬─────────────────┘
             │                      │
             │ gRPC                 │ gRPC
             ▼                      ▼
┌────────────────────┐   ┌────────────────────────┐
│   User Service     │   │  Product Service       │
│     (Python)       │   │     (Node.js)          │
│   Port: 50051      │   │   Port: 50052          │
└────────────────────┘   └────────────────────────┘
```

### Fluxo de Comunicação

1. O usuário interage com o frontend via navegador
2. Frontend faz chamadas gRPC para os microserviços
3. Microserviços processam as requisições e retornam respostas
4. Frontend exibe os resultados para o usuário

## Protocol Buffers

### user.proto

Define o contrato para o User Service:

```protobuf
service UserService {
  rpc CreateUser (CreateUserRequest) returns (UserResponse);
  rpc GetUser (GetUserRequest) returns (UserResponse);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
  rpc UpdateUser (UpdateUserRequest) returns (UserResponse);
  rpc DeleteUser (DeleteUserRequest) returns (DeleteUserResponse);
}
```

### product.proto

Define o contrato para o Product Service:

```protobuf
service ProductService {
  rpc CreateProduct (CreateProductRequest) returns (ProductResponse);
  rpc GetProduct (GetProductRequest) returns (ProductResponse);
  rpc ListProducts (ListProductsRequest) returns (ListProductsResponse);
  rpc UpdateProduct (UpdateProductRequest) returns (ProductResponse);
  rpc DeleteProduct (DeleteProductRequest) returns (DeleteProductResponse);
}
```

## User Service (Python)

### Tecnologias

- **Python 3.11**: Linguagem de programação
- **grpcio**: Biblioteca gRPC para Python
- **grpcio-tools**: Ferramentas para gerar código a partir de .proto

### Estrutura

```
user-service/
├── proto/
│   └── user.proto          # Definição do serviço
├── server.py               # Implementação do servidor
├── requirements.txt        # Dependências Python
└── Dockerfile             # Container Docker
```

### Implementação

O serviço usa um dicionário em memória para armazenar usuários:

```python
users_db = {}
```

Cada método RPC implementa uma operação CRUD:

- **CreateUser**: Cria novo usuário com UUID único
- **GetUser**: Busca usuário por ID
- **ListUsers**: Retorna todos os usuários
- **UpdateUser**: Atualiza dados do usuário
- **DeleteUser**: Remove usuário

### Validações

- Email único por usuário
- Campos obrigatórios validados
- Tratamento de erros com códigos gRPC apropriados

## Product Service (Node.js)

### Tecnologias

- **Node.js 18**: Runtime JavaScript
- **@grpc/grpc-js**: Implementação pura JavaScript do gRPC
- **@grpc/proto-loader**: Carregador de arquivos .proto
- **uuid**: Geração de IDs únicos

### Estrutura

```
product-service/
├── proto/
│   └── product.proto      # Definição do serviço
├── server.js              # Implementação do servidor
├── package.json           # Dependências Node.js
└── Dockerfile            # Container Docker
```

### Implementação

O serviço usa um Map para armazenar produtos:

```javascript
const productsDb = new Map();
```

Cada método RPC implementa uma operação CRUD:

- **CreateProduct**: Cria novo produto com validações
- **GetProduct**: Busca produto por ID
- **ListProducts**: Retorna todos os produtos
- **UpdateProduct**: Atualiza dados do produto
- **DeleteProduct**: Remove produto

### Validações

- Preço não pode ser negativo
- Estoque não pode ser negativo
- Nome é obrigatório
- Tratamento de erros com códigos gRPC apropriados

## Frontend

### Tecnologias

- **Express.js**: Framework web
- **EJS**: Template engine
- **CSS3**: Estilização
- **JavaScript**: Interatividade

### Estrutura

```
frontend/
├── proto/                 # Arquivos .proto copiados
│   ├── user.proto
│   └── product.proto
├── views/                # Templates EJS
│   ├── index.ejs
│   ├── users.ejs
│   └── products.ejs
├── public/              # Arquivos estáticos
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── users.js
│       └── products.js
├── app.js              # Servidor Express
├── package.json
└── Dockerfile
```

### Rotas

#### Páginas

- `GET /` - Homepage
- `GET /users` - Gerenciamento de usuários
- `GET /products` - Gerenciamento de produtos

#### API Usuários

- `POST /api/users` - Criar usuário
- `GET /api/users/:id` - Buscar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

#### API Produtos

- `POST /api/products` - Criar produto
- `GET /api/products/:id` - Buscar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Clientes gRPC

O frontend atua como cliente gRPC, conectando-se aos serviços:

```javascript
const userClient = new userProto.UserService(
  "user-service:50051",
  grpc.credentials.createInsecure(),
);

const productClient = new productProto.ProductService(
  "product-service:50052",
  grpc.credentials.createInsecure(),
);
```

## Docker e Deploy

### Docker Compose

O projeto usa Docker Compose para orquestrar os 3 serviços:

```yaml
services:
  - user-service (porta 50051)
  - product-service (porta 50052)
  - frontend (porta 3000)
```

### Network

Todos os serviços estão na mesma rede Docker (`grpc-network`), permitindo comunicação interna por nome de serviço.

### Health Checks

Cada serviço tem um health check configurado para garantir disponibilidade:

- User Service: Testa conexão na porta 50051
- Product Service: Testa conexão na porta 50052
- Frontend: Testa endpoint HTTP na porta 3000

### Comandos Docker

```bash
# Iniciar todos os serviços
docker-compose up --build

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

## Testes

### Teste Manual via Frontend

1. Acesse http://localhost:3000
2. Navegue para "Usuários" ou "Produtos"
3. Teste as operações CRUD

### Teste com grpcurl

```bash
# Listar serviços disponíveis
grpcurl -plaintext localhost:50051 list

# Criar usuário
grpcurl -plaintext -d '{
  "name": "João Silva",
  "email": "joao@example.com"
}' localhost:50051 user.UserService/CreateUser

# Listar usuários
grpcurl -plaintext -d '{}' \
  localhost:50051 user.UserService/ListUsers

# Criar produto
grpcurl -plaintext -d '{
  "name": "Notebook",
  "description": "Dell Inspiron 15",
  "price": 3500.00,
  "stock": 10
}' localhost:50052 product.ProductService/CreateProduct

# Listar produtos
grpcurl -plaintext -d '{}' \
  localhost:50052 product.ProductService/ListProducts
```

### Teste com BloomRPC

1. Baixe BloomRPC: https://github.com/bloomrpc/bloomrpc
2. Importe os arquivos .proto
3. Configure o endereço: `localhost:50051` ou `localhost:50052`
4. Teste as chamadas RPC visualmente

## Performance e Escalabilidade

### Vantagens do gRPC

1. **Binary Protocol**: Protocol Buffers é mais eficiente que JSON
2. **HTTP/2**: Multiplexing, compressão de headers
3. **Streaming**: Suporte nativo para streaming de dados
4. **Code Generation**: Menos erros, mais produtividade

### Possíveis Melhorias

1. **Banco de Dados**: Substituir armazenamento em memória por PostgreSQL/MongoDB
2. **Cache**: Implementar Redis para cache de dados
3. **Load Balancer**: Usar Nginx ou Traefik para distribuir carga
4. **Service Discovery**: Implementar Consul ou etcd
5. **Observabilidade**: Adicionar Prometheus + Grafana
6. **Autenticação**: Implementar JWT ou OAuth2
7. **Rate Limiting**: Limitar requisições por cliente
8. **Circuit Breaker**: Implementar padrão de resiliência

## Segurança

### Considerações

⚠️ Este projeto é para fins educacionais e não deve ser usado em produção sem as seguintes melhorias:

1. **TLS/SSL**: Usar certificados para comunicação segura
2. **Autenticação**: Implementar autenticação de serviços
3. **Autorização**: Controlar acesso a recursos
4. **Validação de Input**: Sanitizar todas as entradas
5. **Rate Limiting**: Prevenir abuso
6. **Logging**: Registrar todas as operações
7. **Secrets Management**: Usar vault para secrets

## Referências

- [gRPC Official Documentation](https://grpc.io/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [gRPC Python](https://grpc.io/docs/languages/python/)
- [gRPC Node.js](https://grpc.io/docs/languages/node/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Express.js](https://expressjs.com/)

## Licença

MIT License - use livremente para aprendizado e desenvolvimento.
