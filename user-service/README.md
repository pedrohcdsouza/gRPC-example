# User Service (Python)

Microserviço de gerenciamento de usuários implementado em Python usando gRPC.

## 🐍 Tecnologias

- Python 3.11
- gRPC (grpcio)
- Protocol Buffers

## 📁 Estrutura

```
user-service/
├── proto/
│   └── user.proto        # Definição do serviço gRPC
├── server.py             # Implementação do servidor
├── requirements.txt      # Dependências Python
└── Dockerfile           # Container Docker
```

## 🚀 Como Executar

### Com Docker (Recomendado)

```bash
cd user-service
docker build -t user-service .
docker run -p 50051:50051 user-service
```

### Localmente

```bash
cd user-service

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Gerar código gRPC
python -m grpc_tools.protoc -I./proto --python_out=. --grpc_python_out=. ./proto/user.proto

# Iniciar servidor
python server.py
```

## 📡 API gRPC

### Métodos Disponíveis

1. **CreateUser** - Cria um novo usuário
   - Input: `CreateUserRequest { name, email }`
   - Output: `UserResponse { user, message, success }`

2. **GetUser** - Busca usuário por ID
   - Input: `GetUserRequest { id }`
   - Output: `UserResponse { user, message, success }`

3. **ListUsers** - Lista todos os usuários
   - Input: `ListUsersRequest {}`
   - Output: `ListUsersResponse { users[], total }`

4. **UpdateUser** - Atualiza usuário existente
   - Input: `UpdateUserRequest { id, name, email }`
   - Output: `UserResponse { user, message, success }`

5. **DeleteUser** - Remove usuário
   - Input: `DeleteUserRequest { id }`
   - Output: `DeleteUserResponse { success, message }`

## 🧪 Testando

### Com grpcurl

```bash
# Criar usuário
grpcurl -plaintext -d '{
  "name": "João Silva",
  "email": "joao@example.com"
}' localhost:50051 user.UserService/CreateUser

# Listar usuários
grpcurl -plaintext -d '{}' localhost:50051 user.UserService/ListUsers

# Buscar usuário (substitua o ID)
grpcurl -plaintext -d '{
  "id": "seu-id-aqui"
}' localhost:50051 user.UserService/GetUser
```

### Com Python Client

```python
import grpc
import user_pb2
import user_pb2_grpc

# Criar canal
channel = grpc.insecure_channel('localhost:50051')
stub = user_pb2_grpc.UserServiceStub(channel)

# Criar usuário
request = user_pb2.CreateUserRequest(
    name="Maria Santos",
    email="maria@example.com"
)
response = stub.CreateUser(request)
print(response)
```

## 💾 Armazenamento

Atualmente usa armazenamento em memória (dicionário Python). Para produção, considere:

- PostgreSQL
- MongoDB
- MySQL
- SQLite

## 🔧 Configuração

### Porta

Por padrão, o serviço roda na porta `50051`. Para mudar:

```python
# Em server.py
server.add_insecure_port('[::]:NOVA_PORTA')
```

### Workers

Ajuste o número de workers do servidor:

```python
# Em server.py
server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
```

## 📊 Logs

O serviço exibe logs no stdout:

```
🚀 User Service (Python) iniciado na porta 50051
📊 Aguardando requisições gRPC...
```

## ⚠️ Limitações Atuais

- Dados não persistentes (memória)
- Sem autenticação
- Sem validação avançada de email
- Sem paginação na listagem

## 🔮 Melhorias Futuras

- [ ] Adicionar banco de dados
- [ ] Implementar autenticação
- [ ] Validação de email robusta
- [ ] Paginação e filtros
- [ ] Testes unitários
- [ ] Logging estruturado
- [ ] Métricas (Prometheus)
- [ ] Health checks
- [ ] Graceful shutdown

## 📚 Referências

- [gRPC Python](https://grpc.io/docs/languages/python/)
- [Protocol Buffers Python](https://developers.google.com/protocol-buffers/docs/pythontutorial)
