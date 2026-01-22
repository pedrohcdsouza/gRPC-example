const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Carregar o arquivo proto
const PROTO_PATH = path.join(__dirname, "proto", "product.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(packageDefinition).product;

// Armazenamento em memória (simulando um banco de dados)
const productsDb = new Map();

/**
 * Implementação do serviço de produtos
 */
const productService = {
  /**
   * Cria um novo produto
   */
  CreateProduct: (call, callback) => {
    try {
      const { name, description, price, stock } = call.request;

      // Validações
      if (!name || name.trim() === "") {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: "Nome do produto é obrigatório",
        });
      }

      if (price < 0) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: "Preço não pode ser negativo",
        });
      }

      if (stock < 0) {
        return callback({
          code: grpc.status.INVALID_ARGUMENT,
          details: "Estoque não pode ser negativo",
        });
      }

      const productId = uuidv4();
      const product = {
        id: productId,
        name,
        description: description || "",
        price,
        stock,
        created_at: Date.now(),
      };

      productsDb.set(productId, product);

      callback(null, {
        product,
        success: true,
        message: "Produto criado com sucesso",
      });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        details: `Erro ao criar produto: ${error.message}`,
      });
    }
  },

  /**
   * Busca um produto por ID
   */
  GetProduct: (call, callback) => {
    const { id } = call.request;
    const product = productsDb.get(id);

    if (!product) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Produto não encontrado",
      });
    }

    callback(null, {
      product,
      success: true,
      message: "Produto encontrado",
    });
  },

  /**
   * Lista todos os produtos
   */
  ListProducts: (call, callback) => {
    const products = Array.from(productsDb.values());

    callback(null, {
      products,
      total: products.length,
    });
  },

  /**
   * Atualiza um produto existente
   */
  UpdateProduct: (call, callback) => {
    const { id, name, description, price, stock } = call.request;

    if (!productsDb.has(id)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Produto não encontrado",
      });
    }

    // Validações
    if (price < 0) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Preço não pode ser negativo",
      });
    }

    if (stock < 0) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Estoque não pode ser negativo",
      });
    }

    const product = productsDb.get(id);
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;

    productsDb.set(id, product);

    callback(null, {
      product,
      success: true,
      message: "Produto atualizado com sucesso",
    });
  },

  /**
   * Deleta um produto
   */
  DeleteProduct: (call, callback) => {
    const { id } = call.request;

    if (!productsDb.has(id)) {
      return callback({
        code: grpc.status.NOT_FOUND,
        details: "Produto não encontrado",
      });
    }

    productsDb.delete(id);

    callback(null, {
      success: true,
      message: "Produto deletado com sucesso",
    });
  },
};

/**
 * Inicia o servidor gRPC
 */
function main() {
  const server = new grpc.Server();
  server.addService(productProto.ProductService.service, productService);

  server.bindAsync(
    "0.0.0.0:50052",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("❌ Erro ao iniciar servidor:", error);
        return;
      }

      console.log("🚀 Product Service (Node.js) iniciado na porta 50052");
      console.log("📊 Aguardando requisições gRPC...");
      server.start();
    },
  );
}

main();
