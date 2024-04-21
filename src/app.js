//Import the necessary dependencies
const http = require("http");
// Define a port at which the server will run
const PORT = process.env.PORT || 4000;

const productsService = require("./productsService");
const { getRequestData, getID, getProduct } = require("./utils");
const url = require("node:url");
const { getProducts } = require("./productsService");

const server = http.createServer(async (req, res) => {
  // Get all products
  if (req.url === "/api/products" && req.method === "GET") {
    const data = productsService.getProducts();
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }

  // Get a product with specified id
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
    const productID = getID(req.url);
    productsService.getProductsById(productID, (err, data) => {
      if (err) {
        res.writeHead(500, {
          "content-type": "application/json",
        });
        res.end(
          JSON.stringify({
            error: "An error occurred while fetching the product ",
          }),
        );
      }
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(data);
    });
  }

  // Create a new product
  else if (req.url === "/api/products" && req.method === "POST") {
    let productData = await getRequestData(req);
    productsService.saveProduct(productData, (err, data) => {
      if (err) {
        res.writeHead(500, {
          "content-type": "application/json",
        });
        res.end(
          JSON.stringify({
            error: "An error occurred while saving this product",
          }),
        );
      }
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(data);
    });
  }

  // Update a specific product
  else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PUT") {
    const productID = getID(req.url);
    let productData = await getRequestData(req);

    productsService.updateProduct(productID, productData, (err, data) => {
      if (err) {
        res.writeHead(500, {
          "content-type": "application/json",
        });
        res.end(
          JSON.stringify({
            error: "An error occurred while saving this product",
          }),
        );
      }
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(data);
    });
  }

  // Delete a specific Product
  else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const productID = getID(req.url);
    productsService.deleteProduct(productID, (err, data) => {
      if (err) {
        res.writeHead(500, {
          "content-type": "application/json",
        });
        res.end(
          JSON.stringify({
            error: "An error occurred while fetching the product ",
          }),
        );
      }
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(JSON.stringify(data));
    });
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
