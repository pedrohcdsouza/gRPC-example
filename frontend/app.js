const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Carregar protos
const USER_PROTO_PATH = path.join(__dirname, "proto", "user.proto");
const PRODUCT_PROTO_PATH = path.join(__dirname, "proto", "product.proto");

const protoOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const userPackageDefinition = protoLoader.loadSync(
  USER_PROTO_PATH,
  protoOptions,
);
const productPackageDefinition = protoLoader.loadSync(
  PRODUCT_PROTO_PATH,
  protoOptions,
);

const userProto = grpc.loadPackageDefinition(userPackageDefinition).user;
const productProto = grpc.loadPackageDefinition(
  productPackageDefinition,
).product;

// Clientes gRPC
const userClient = new userProto.UserService(
  process.env.USER_SERVICE_URL || "localhost:50051",
  grpc.credentials.createInsecure(),
);

const productClient = new productProto.ProductService(
  process.env.PRODUCT_SERVICE_URL || "localhost:50052",
  grpc.credentials.createInsecure(),
);

// Rotas - Página Principal
app.get("/", (req, res) => {
  res.render("index");
});

// ============== ROTAS DE USUÁRIOS ==============

// Página de usuários
app.get("/users", (req, res) => {
  userClient.ListUsers({}, (error, response) => {
    if (error) {
      return res.render("users", { users: [], error: error.message });
    }
    res.render("users", { users: response.users, error: null });
  });
});

// Criar usuário
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  userClient.CreateUser({ name, email }, (error, response) => {
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.json(response);
  });
});

// Buscar usuário
app.get("/api/users/:id", (req, res) => {
  userClient.GetUser({ id: req.params.id }, (error, response) => {
    if (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.json(response);
  });
});

// Atualizar usuário
app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;

  userClient.UpdateUser(
    { id: req.params.id, name, email },
    (error, response) => {
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.json(response);
    },
  );
});

// Deletar usuário
app.delete("/api/users/:id", (req, res) => {
  userClient.DeleteUser({ id: req.params.id }, (error, response) => {
    if (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.json(response);
  });
});

// ============== ROTAS DE PRODUTOS ==============

// Página de produtos
app.get("/products", (req, res) => {
  productClient.ListProducts({}, (error, response) => {
    if (error) {
      return res.render("products", { products: [], error: error.message });
    }
    res.render("products", { products: response.products, error: null });
  });
});

// Criar produto
app.post("/api/products", (req, res) => {
  const { name, description, price, stock } = req.body;

  productClient.CreateProduct(
    {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
    },
    (error, response) => {
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.json(response);
    },
  );
});

// Buscar produto
app.get("/api/products/:id", (req, res) => {
  productClient.GetProduct({ id: req.params.id }, (error, response) => {
    if (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.json(response);
  });
});

// Atualizar produto
app.put("/api/products/:id", (req, res) => {
  const { name, description, price, stock } = req.body;

  productClient.UpdateProduct(
    {
      id: req.params.id,
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
    },
    (error, response) => {
      if (error) {
        return res.status(400).json({ success: false, message: error.message });
      }
      res.json(response);
    },
  );
});

// Deletar produto
app.delete("/api/products/:id", (req, res) => {
  productClient.DeleteProduct({ id: req.params.id }, (error, response) => {
    if (error) {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.json(response);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌐 Frontend rodando em http://localhost:${PORT}`);
  console.log(`📡 Conectado aos serviços gRPC:`);
  console.log(
    `   - User Service: ${process.env.USER_SERVICE_URL || "localhost:50051"}`,
  );
  console.log(
    `   - Product Service: ${process.env.PRODUCT_SERVICE_URL || "localhost:50052"}`,
  );
});
