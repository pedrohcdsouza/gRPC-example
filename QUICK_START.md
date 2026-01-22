# 🚀 Guia de Início Rápido

## Pré-requisitos

Certifique-se de ter instalado:

- Docker Desktop (Windows/Mac) ou Docker Engine (Linux)
- Docker Compose

## Passo 1: Clone o Repositório

```bash
git clone <repository-url>
cd gRPC-example
```

## Passo 2: Inicie os Serviços

```bash
docker-compose up --build
```

Este comando irá:

1. Construir as imagens Docker para cada serviço
2. Criar a rede interna para comunicação entre serviços
3. Iniciar todos os containers

**Aguarde até ver as mensagens:**

```
user-service     | 🚀 User Service (Python) iniciado na porta 50051
product-service  | 🚀 Product Service (Node.js) iniciado na porta 50052
frontend         | 🌐 Frontend rodando em http://localhost:3000
```

## Passo 3: Acesse o Frontend

Abra seu navegador e acesse: **http://localhost:3000**

## Passo 4: Teste as Funcionalidades

### Gerenciar Usuários

1. Clique em **"Gerenciar Usuários"**
2. Preencha o formulário para criar um novo usuário
3. Veja a lista de usuários criados
4. Teste editar e deletar usuários

### Gerenciar Produtos

1. Clique em **"Gerenciar Produtos"**
2. Preencha o formulário para criar um novo produto
3. Veja a lista de produtos criados
4. Teste editar e deletar produtos

## Comandos Úteis

### Ver logs de todos os serviços

```bash
docker-compose logs -f
```

### Ver logs de um serviço específico

```bash
docker-compose logs -f user-service
docker-compose logs -f product-service
docker-compose logs -f frontend
```

### Parar os serviços

```bash
docker-compose down
```

### Parar e limpar tudo (incluindo volumes)

```bash
docker-compose down -v
```

### Reconstruir um serviço específico

```bash
docker-compose up --build user-service
```

### Reiniciar um serviço

```bash
docker-compose restart user-service
```

## Testando com cURL

### Criar Usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Maria Silva", "email": "maria@example.com"}'
```

### Criar Produto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Mouse Gamer", "description": "RGB LED", "price": 150.00, "stock": 20}'
```

## Testando Diretamente com gRPC (Avançado)

### Instalar grpcurl

**Windows (via Chocolatey):**

```bash
choco install grpcurl
```

**Mac (via Homebrew):**

```bash
brew install grpcurl
```

**Linux:**

```bash
# Download do release
wget https://github.com/fullstorydev/grpcurl/releases/download/v1.8.9/grpcurl_1.8.9_linux_x86_64.tar.gz
tar -xvf grpcurl_1.8.9_linux_x86_64.tar.gz
sudo mv grpcurl /usr/local/bin/
```

### Testar User Service

```bash
# Listar serviços disponíveis
grpcurl -plaintext localhost:50051 list

# Criar usuário
grpcurl -plaintext -d '{"name": "João", "email": "joao@test.com"}' \
  localhost:50051 user.UserService/CreateUser

# Listar usuários
grpcurl -plaintext -d '{}' localhost:50051 user.UserService/ListUsers
```

### Testar Product Service

```bash
# Listar serviços disponíveis
grpcurl -plaintext localhost:50052 list

# Criar produto
grpcurl -plaintext -d '{"name": "Teclado", "description": "Mecânico", "price": 300, "stock": 15}' \
  localhost:50052 product.ProductService/CreateProduct

# Listar produtos
grpcurl -plaintext -d '{}' localhost:50052 product.ProductService/ListProducts
```

## Desenvolvimento Local (Sem Docker)

### User Service (Python)

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

### Product Service (Node.js)

```bash
cd product-service

# Instalar dependências
npm install

# Iniciar servidor
npm start

# Ou em modo desenvolvimento
npm run dev
```

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor
npm start

# Ou em modo desenvolvimento
npm run dev
```

**Nota:** Ao rodar localmente, ajuste as URLs dos serviços em `frontend/app.js`:

```javascript
const userClient = new userProto.UserService(
  "localhost:50051", // Em vez de 'user-service:50051'
  grpc.credentials.createInsecure(),
);
```

## Troubleshooting

### Porta já em uso

Se alguma porta estiver em uso, você pode alterar no `docker-compose.yml`:

```yaml
ports:
  - "3001:3000" # Muda frontend para porta 3001
```

### Containers não iniciam

```bash
# Limpar tudo e começar do zero
docker-compose down -v
docker system prune -a
docker-compose up --build
```

### Erro de conexão gRPC

Certifique-se de que todos os serviços estão rodando:

```bash
docker-compose ps
```

Todos devem estar com status "Up" ou "Up (healthy)".

### Ver logs de erro

```bash
docker-compose logs --tail=100 user-service
docker-compose logs --tail=100 product-service
docker-compose logs --tail=100 frontend
```

## Próximos Passos

1. ✅ Explore a interface web
2. ✅ Teste todas as operações CRUD
3. ✅ Leia a documentação técnica em `DOCUMENTATION.md`
4. ✅ Experimente modificar os serviços
5. ✅ Adicione novos campos ou métodos RPC
6. ✅ Implemente persistência com banco de dados

## Recursos Adicionais

- 📚 [Documentação Completa](./DOCUMENTATION.md)
- 🌐 [gRPC Official Docs](https://grpc.io/)
- 📖 [Protocol Buffers Guide](https://developers.google.com/protocol-buffers)

## Suporte

Se encontrar problemas:

1. Verifique os logs: `docker-compose logs -f`
2. Consulte a seção Troubleshooting
3. Revise a documentação técnica
4. Abra uma issue no repositório

---

**Divirta-se explorando gRPC! 🚀**
