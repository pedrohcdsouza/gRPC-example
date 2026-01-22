# Product Service (Node.js)

Microserviço de gerenciamento de produtos implementado em Node.js usando gRPC.

## 📦 Tecnologias

- Node.js 18
- @grpc/grpc-js
- @grpc/proto-loader
- uuid

## 📁 Estrutura

```
product-service/
├── proto/
│   └── product.proto     # Definição do serviço gRPC
├── server.js             # Implementação do servidor
├── package.json          # Dependências Node.js
└── Dockerfile           # Container Docker
```

## 🚀 Como Executar

### Com Docker (Recomendado)

```bash
cd product-service
docker build -t product-service .
docker run -p 50052:50052 product-service
```

### Localmente

```bash
cd product-service

# Instalar dependências
npm install

# Iniciar servidor
npm start

# Ou em modo desenvolvimento (com nodemon)
npm run dev
```

## 📡 API gRPC

### Métodos Disponíveis

1. **CreateProduct** - Cria um novo produto
   - Input: `CreateProductRequest { name, description, price, stock }`
   - Output: `ProductResponse { product, message, success }`

2. **GetProduct** - Busca produto por ID
   - Input: `GetProductRequest { id }`
   - Output: `ProductResponse { product, message, success }`

3. **ListProducts** - Lista todos os produtos
   - Input: `ListProductsRequest {}`
   - Output: `ListProductsResponse { products[], total }`

4. **UpdateProduct** - Atualiza produto existente
   - Input: `UpdateProductRequest { id, name, description, price, stock }`
   - Output: `ProductResponse { product, message, success }`

5. **DeleteProduct** - Remove produto
   - Input: `DeleteProductRequest { id }`
   - Output: `DeleteProductResponse { success, message }`

## 🧪 Testando

### Com grpcurl

```bash
# Criar produto
grpcurl -plaintext -d '{
  "name": "Notebook Dell",
  "description": "Intel i5, 8GB RAM",
  "price": 3500.00,
  "stock": 10
}' localhost:50052 product.ProductService/CreateProduct

# Listar produtos
grpcurl -plaintext -d '{}' localhost:50052 product.ProductService/ListProducts

# Buscar produto (substitua o ID)
grpcurl -plaintext -d '{
  "id": "seu-id-aqui"
}' localhost:50052 product.ProductService/GetProduct
```

### Com Node.js Client

```javascript
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./proto/product.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const productProto = grpc.loadPackageDefinition(packageDefinition).product;

const client = new productProto.ProductService(
  "localhost:50052",
  grpc.credentials.createInsecure(),
);

// Criar produto
client.CreateProduct(
  {
    name: "Mouse Gamer",
    description: "RGB, 16000 DPI",
    price: 150.0,
    stock: 25,
  },
  (error, response) => {
    if (error) {
      console.error("Erro:", error);
      return;
    }
    console.log("Produto criado:", response);
  },
);
```

## 💾 Armazenamento

Atualmente usa armazenamento em memória (Map do JavaScript). Para produção, considere:

- PostgreSQL
- MongoDB
- MySQL
- Redis

## 🔧 Configuração

### Porta

Por padrão, o serviço roda na porta `50052`. Para mudar:

```javascript
// Em server.js
server.bindAsync(
  "0.0.0.0:NOVA_PORTA",
  grpc.ServerCredentials.createInsecure(),
  // ...
);
```

### Validações

O serviço valida:

- Nome obrigatório
- Preço não negativo
- Estoque não negativo

```javascript
if (price < 0) {
  return callback({
    code: grpc.status.INVALID_ARGUMENT,
    details: "Preço não pode ser negativo",
  });
}
```

## 📊 Logs

O serviço exibe logs no stdout:

```
🚀 Product Service (Node.js) iniciado na porta 50052
📊 Aguardando requisições gRPC...
```

## ⚠️ Limitações Atuais

- Dados não persistentes (memória)
- Sem autenticação
- Sem paginação na listagem
- Sem busca/filtros avançados

## 🔮 Melhorias Futuras

- [ ] Adicionar banco de dados
- [ ] Implementar autenticação
- [ ] Paginação e filtros
- [ ] Busca por nome/categoria
- [ ] Controle de estoque
- [ ] Histórico de alterações
- [ ] Testes unitários
- [ ] Logging estruturado
- [ ] Métricas (Prometheus)
- [ ] Health checks
- [ ] Graceful shutdown

## 🎯 Boas Práticas

### Tratamento de Erros

```javascript
try {
  // Lógica
} catch (error) {
  callback({
    code: grpc.status.INTERNAL,
    details: `Erro: ${error.message}`,
  });
}
```

### Validação de Input

```javascript
if (!name || name.trim() === "") {
  return callback({
    code: grpc.status.INVALID_ARGUMENT,
    details: "Nome do produto é obrigatório",
  });
}
```

## 📚 Referências

- [gRPC Node.js](https://grpc.io/docs/languages/node/)
- [@grpc/grpc-js](https://www.npmjs.com/package/@grpc/grpc-js)
- [@grpc/proto-loader](https://www.npmjs.com/package/@grpc/proto-loader)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
