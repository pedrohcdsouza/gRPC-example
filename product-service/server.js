const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Simplified UUID generation if uuid pkg not present, let's use Math.random for simplicity or install uuid
// Actually I didn't add uuid to package.json, let's add it or use a simple random string

const PROTO_PATH = path.join(__dirname, "proto", "product.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(packageDefinition).product;

// In-memory data
let products = [
  {
    id: "1",
    name: "Laptop",
    description: "High performance laptop",
    price: 1200.0,
    stock: 10,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model",
    price: 800.0,
    stock: 20,
  },
];

const generateId = () => Math.random().toString(36).substring(2, 15);

const server = new grpc.Server();

server.addService(productProto.ProductService.service, {
  ListProducts: (_, callback) => {
    callback(null, { products });
  },

  CreateProduct: (call, callback) => {
    const product = {
      id: generateId(),
      ...call.request,
    };
    products.push(product);
    callback(null, product);
  },

  GetProduct: (call, callback) => {
    const product = products.find((p) => p.id === call.request.id);
    if (product) {
      callback(null, product);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Product not found",
      });
    }
  },

  UpdateProduct: (call, callback) => {
    const index = products.findIndex((p) => p.id === call.request.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...call.request };
      callback(null, products[index]);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Product not found",
      });
    }
  },

  DeleteProduct: (call, callback) => {
    const index = products.findIndex((p) => p.id === call.request.id);
    if (index !== -1) {
      products.splice(index, 1);
      callback(null, { success: true });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Product not found",
      });
    }
  },
});

const PORT = "0.0.0.0:50052";
server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Product Service running on port ${port}`);
  server.start();
});
