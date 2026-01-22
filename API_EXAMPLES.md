# Exemplos de Uso da API

## 📝 Índice

1. [User Service - API REST](#user-service---api-rest)
2. [Product Service - API REST](#product-service---api-rest)
3. [Exemplos com cURL](#exemplos-com-curl)
4. [Exemplos com PowerShell](#exemplos-com-powershell)
5. [Exemplos com grpcurl](#exemplos-com-grpcurl)
6. [Exemplos em JavaScript](#exemplos-em-javascript)
7. [Exemplos em Python](#exemplos-em-python)

---

## User Service - API REST

### Criar Usuário

**Endpoint:** `POST /api/users`

**Request Body:**

```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

**Response:**

```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao.silva@example.com",
    "created_at": "1737580800"
  },
  "message": "Usuário criado com sucesso",
  "success": true
}
```

### Buscar Usuário

**Endpoint:** `GET /api/users/:id`

**Response:**

```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao.silva@example.com",
    "created_at": "1737580800"
  },
  "message": "Usuário encontrado",
  "success": true
}
```

### Atualizar Usuário

**Endpoint:** `PUT /api/users/:id`

**Request Body:**

```json
{
  "name": "João Silva Santos",
  "email": "joao.santos@example.com"
}
```

**Response:**

```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva Santos",
    "email": "joao.santos@example.com",
    "created_at": "1737580800"
  },
  "message": "Usuário atualizado com sucesso",
  "success": true
}
```

### Deletar Usuário

**Endpoint:** `DELETE /api/users/:id`

**Response:**

```json
{
  "success": true,
  "message": "Usuário deletado com sucesso"
}
```

---

## Product Service - API REST

### Criar Produto

**Endpoint:** `POST /api/products`

**Request Body:**

```json
{
  "name": "Notebook Dell Inspiron",
  "description": "15 polegadas, Intel i5, 8GB RAM",
  "price": 3500.0,
  "stock": 10
}
```

**Response:**

```json
{
  "product": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Notebook Dell Inspiron",
    "description": "15 polegadas, Intel i5, 8GB RAM",
    "price": 3500.0,
    "stock": 10,
    "created_at": "1737580800000"
  },
  "message": "Produto criado com sucesso",
  "success": true
}
```

### Buscar Produto

**Endpoint:** `GET /api/products/:id`

**Response:**

```json
{
  "product": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Notebook Dell Inspiron",
    "description": "15 polegadas, Intel i5, 8GB RAM",
    "price": 3500.0,
    "stock": 10,
    "created_at": "1737580800000"
  },
  "message": "Produto encontrado",
  "success": true
}
```

### Atualizar Produto

**Endpoint:** `PUT /api/products/:id`

**Request Body:**

```json
{
  "name": "Notebook Dell Inspiron 15",
  "description": "15 polegadas, Intel i7, 16GB RAM",
  "price": 4200.0,
  "stock": 5
}
```

**Response:**

```json
{
  "product": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Notebook Dell Inspiron 15",
    "description": "15 polegadas, Intel i7, 16GB RAM",
    "price": 4200.0,
    "stock": 5,
    "created_at": "1737580800000"
  },
  "message": "Produto atualizado com sucesso",
  "success": true
}
```

### Deletar Produto

**Endpoint:** `DELETE /api/products/:id`

**Response:**

```json
{
  "success": true,
  "message": "Produto deletado com sucesso"
}
```

---

## Exemplos com cURL

### Criar Usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Oliveira",
    "email": "maria@example.com"
  }'
```

### Listar Todos os Usuários (via página)

```bash
curl http://localhost:3000/users
```

### Buscar Usuário Específico

```bash
curl http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

### Atualizar Usuário

```bash
curl -X PUT http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Oliveira Silva",
    "email": "maria.silva@example.com"
  }'
```

### Deletar Usuário

```bash
curl -X DELETE http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000
```

### Criar Produto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mouse Gamer",
    "description": "RGB, 16000 DPI",
    "price": 150.00,
    "stock": 25
  }'
```

### Buscar Produto

```bash
curl http://localhost:3000/api/products/660e8400-e29b-41d4-a716-446655440000
```

---

## Exemplos com PowerShell

### Criar Usuário

```powershell
$body = @{
    name = "Pedro Santos"
    email = "pedro@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Buscar Usuário

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000" `
    -Method GET
```

### Atualizar Usuário

```powershell
$body = @{
    name = "Pedro Santos Silva"
    email = "pedro.silva@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000" `
    -Method PUT `
    -Body $body `
    -ContentType "application/json"
```

### Deletar Usuário

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000" `
    -Method DELETE
```

### Criar Produto

```powershell
$body = @{
    name = "Teclado Mecânico"
    description = "Switch Blue, RGB"
    price = 350.00
    stock = 15
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/products" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

---

## Exemplos com grpcurl

### User Service

#### Listar Serviços Disponíveis

```bash
grpcurl -plaintext localhost:50051 list
```

#### Criar Usuário

```bash
grpcurl -plaintext -d '{
  "name": "Ana Costa",
  "email": "ana@example.com"
}' localhost:50051 user.UserService/CreateUser
```

#### Buscar Usuário

```bash
grpcurl -plaintext -d '{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}' localhost:50051 user.UserService/GetUser
```

#### Listar Todos os Usuários

```bash
grpcurl -plaintext -d '{}' localhost:50051 user.UserService/ListUsers
```

#### Atualizar Usuário

```bash
grpcurl -plaintext -d '{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Ana Costa Silva",
  "email": "ana.silva@example.com"
}' localhost:50051 user.UserService/UpdateUser
```

#### Deletar Usuário

```bash
grpcurl -plaintext -d '{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}' localhost:50051 user.UserService/DeleteUser
```

### Product Service

#### Listar Serviços Disponíveis

```bash
grpcurl -plaintext localhost:50052 list
```

#### Criar Produto

```bash
grpcurl -plaintext -d '{
  "name": "Monitor 27 polegadas",
  "description": "Full HD, 144Hz",
  "price": 1200.00,
  "stock": 8
}' localhost:50052 product.ProductService/CreateProduct
```

#### Buscar Produto

```bash
grpcurl -plaintext -d '{
  "id": "660e8400-e29b-41d4-a716-446655440000"
}' localhost:50052 product.ProductService/GetProduct
```

#### Listar Todos os Produtos

```bash
grpcurl -plaintext -d '{}' localhost:50052 product.ProductService/ListProducts
```

#### Atualizar Produto

```bash
grpcurl -plaintext -d '{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "name": "Monitor 27 polegadas 4K",
  "description": "4K UHD, 144Hz, HDR",
  "price": 1800.00,
  "stock": 5
}' localhost:50052 product.ProductService/UpdateProduct
```

#### Deletar Produto

```bash
grpcurl -plaintext -d '{
  "id": "660e8400-e29b-41d4-a716-446655440000"
}' localhost:50052 product.ProductService/DeleteProduct
```

---

## Exemplos em JavaScript

### Criar Usuário

```javascript
async function createUser() {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Carlos Mendes",
      email: "carlos@example.com",
    }),
  });

  const data = await response.json();
  console.log(data);
}

createUser();
```

### Listar Usuários (via gRPC Client)

```javascript
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./proto/user.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

client.ListUsers({}, (error, response) => {
  if (error) {
    console.error("Erro:", error);
    return;
  }
  console.log("Usuários:", response.users);
});
```

---

## Exemplos em Python

### Criar Usuário (via HTTP)

```python
import requests
import json

url = "http://localhost:3000/api/users"
data = {
    "name": "Fernanda Lima",
    "email": "fernanda@example.com"
}

response = requests.post(url, json=data)
print(response.json())
```

### Listar Usuários (via gRPC)

```python
import grpc
import user_pb2
import user_pb2_grpc

# Criar canal
channel = grpc.insecure_channel('localhost:50051')
stub = user_pb2_grpc.UserServiceStub(channel)

# Listar usuários
response = stub.ListUsers(user_pb2.ListUsersRequest())
print(f"Total de usuários: {response.total}")

for user in response.users:
    print(f"ID: {user.id}")
    print(f"Nome: {user.name}")
    print(f"Email: {user.email}")
    print("---")
```

### Criar Usuário (via gRPC)

```python
import grpc
import user_pb2
import user_pb2_grpc

# Criar canal
channel = grpc.insecure_channel('localhost:50051')
stub = user_pb2_grpc.UserServiceStub(channel)

# Criar usuário
request = user_pb2.CreateUserRequest(
    name="Roberto Alves",
    email="roberto@example.com"
)

response = stub.CreateUser(request)

if response.success:
    print(f"✅ {response.message}")
    print(f"Usuário criado: {response.user.name}")
else:
    print(f"❌ {response.message}")
```

---

## Códigos de Status HTTP

### Sucesso

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso

### Erro do Cliente

- `400 Bad Request` - Dados inválidos
- `404 Not Found` - Recurso não encontrado

### Erro do Servidor

- `500 Internal Server Error` - Erro interno do servidor

## Códigos de Status gRPC

- `OK` - Sucesso
- `INVALID_ARGUMENT` - Argumentos inválidos
- `NOT_FOUND` - Recurso não encontrado
- `INTERNAL` - Erro interno do servidor
- `UNAVAILABLE` - Serviço indisponível

---

## Dicas

1. **Sempre valide os dados antes de enviar**
2. **Trate os erros adequadamente**
3. **Use variáveis de ambiente para URLs em produção**
4. **Implemente retry logic para chamadas gRPC**
5. **Adicione logs para debug**
6. **Use HTTPS/TLS em produção**

---

Para mais informações, consulte:

- [README.md](./README.md)
- [DOCUMENTATION.md](./DOCUMENTATION.md)
- [QUICK_START.md](./QUICK_START.md)
