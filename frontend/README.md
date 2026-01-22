# Frontend (Node.js + Express)

Interface web para consumir os microserviços gRPC de usuários e produtos.

## 🌐 Tecnologias

- Node.js 18
- Express.js
- EJS (Template Engine)
- gRPC Client
- CSS3
- JavaScript (Vanilla)

## 📁 Estrutura

```
frontend/
├── proto/               # Arquivos .proto dos serviços
│   ├── user.proto
│   └── product.proto
├── views/              # Templates EJS
│   ├── index.ejs       # Homepage
│   ├── users.ejs       # Página de usuários
│   └── products.ejs    # Página de produtos
├── public/            # Arquivos estáticos
│   ├── css/
│   │   └── style.css   # Estilos
│   └── js/
│       ├── users.js    # Lógica de usuários
│       └── products.js # Lógica de produtos
├── app.js             # Servidor Express
├── package.json       # Dependências
└── Dockerfile        # Container Docker
```

## 🚀 Como Executar

### Com Docker (Recomendado)

```bash
cd frontend
docker build -t frontend .
docker run -p 3000:3000 \
  -e USER_SERVICE_URL=user-service:50051 \
  -e PRODUCT_SERVICE_URL=product-service:50052 \
  frontend
```

### Localmente

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor
npm start

# Ou em modo desenvolvimento (com nodemon)
npm run dev
```

**Nota:** Ao rodar localmente, certifique-se de que os serviços gRPC estão acessíveis e ajuste as URLs em `app.js` se necessário.

## 🌟 Funcionalidades

### Homepage (`/`)

- Visão geral do projeto
- Links para gerenciamento
- Arquitetura do sistema
- Tecnologias utilizadas

### Gerenciamento de Usuários (`/users`)

- ➕ Criar usuário
- 📋 Listar usuários
- ✏️ Editar usuário
- 🗑️ Deletar usuário

### Gerenciamento de Produtos (`/products`)

- ➕ Criar produto
- 📋 Listar produtos
- ✏️ Editar produto
- 🗑️ Deletar produto

## 🔌 Rotas

### Páginas HTML

```
GET  /              - Homepage
GET  /users         - Página de usuários
GET  /products      - Página de produtos
```

### API REST (proxy para gRPC)

#### Usuários

```
POST   /api/users           - Criar usuário
GET    /api/users/:id       - Buscar usuário
PUT    /api/users/:id       - Atualizar usuário
DELETE /api/users/:id       - Deletar usuário
```

#### Produtos

```
POST   /api/products        - Criar produto
GET    /api/products/:id    - Buscar produto
PUT    /api/products/:id    - Atualizar produto
DELETE /api/products/:id    - Deletar produto
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
USER_SERVICE_URL=localhost:50051      # URL do User Service
PRODUCT_SERVICE_URL=localhost:50052   # URL do Product Service
PORT=3000                             # Porta do frontend
```

### Clientes gRPC

```javascript
const userClient = new userProto.UserService(
  process.env.USER_SERVICE_URL || "localhost:50051",
  grpc.credentials.createInsecure(),
);

const productClient = new productProto.ProductService(
  process.env.PRODUCT_SERVICE_URL || "localhost:50052",
  grpc.credentials.createInsecure(),
);
```

## 🎨 Interface

### Design

- Gradiente moderno (roxo/azul)
- Cards responsivos
- Formulários intuitivos
- Tabelas organizadas
- Modal para edição
- Feedback visual (alerts)

### Responsividade

- Desktop: Layout em grid
- Tablet: Layout adaptativo
- Mobile: Layout em coluna

## 📊 Fluxo de Dados

```
1. Usuário preenche formulário
2. JavaScript captura o submit
3. Fetch API envia para backend
4. Express recebe a requisição
5. Backend faz chamada gRPC
6. Microserviço processa
7. Resposta volta via gRPC
8. Backend converte para JSON
9. Frontend recebe resposta
10. Página é atualizada
```

## 🧪 Testando

### Com o Navegador

1. Acesse http://localhost:3000
2. Navegue para "Usuários" ou "Produtos"
3. Teste criar, editar e deletar

### Com cURL

```bash
# Criar usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Teste", "email": "teste@example.com"}'

# Criar produto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Produto", "description": "Desc", "price": 100, "stock": 10}'
```

## ⚠️ Limitações Atuais

- Sem autenticação
- Sem paginação
- Sem filtros/busca
- Sem upload de imagens
- Validação básica

## 🔮 Melhorias Futuras

- [ ] Autenticação de usuários
- [ ] Paginação nas listas
- [ ] Filtros e busca
- [ ] Upload de fotos de produtos
- [ ] Dashboard com estatísticas
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] Testes E2E
- [ ] PWA (Progressive Web App)
- [ ] WebSocket para updates em tempo real

## 🛡️ Segurança

Para produção, implemente:

1. **HTTPS/TLS**

```javascript
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

https.createServer(options, app).listen(443);
```

2. **Helmet.js**

```javascript
const helmet = require("helmet");
app.use(helmet());
```

3. **Rate Limiting**

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/api/", limiter);
```

4. **Input Validation**

```javascript
const { body, validationResult } = require("express-validator");

app.post(
  "/api/users",
  body("email").isEmail(),
  body("name").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ...
  },
);
```

## 📚 Referências

- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [gRPC Node.js](https://grpc.io/docs/languages/node/)
- [MDN Web Docs](https://developer.mozilla.org/)
