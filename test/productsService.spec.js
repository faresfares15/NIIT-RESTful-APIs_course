const { expect } = require("chai");

const productsService = require("../src/productsService");

describe("Testing productService methods", function () {
  it("Testing get all the products", function (done) {
    let products = JSON.parse(productsService.getProducts());

    expect(products).to.be.an("Array");
    expect(products.length).to.be.equal(4);
    expect(products[0].name).to.be.equal("LED Monitor");
    expect(products[1].name).to.be.equal("Power Bank");
    expect(products[2].name).to.be.equal("Optical Mouse");
    expect(products[3].name).to.be.equal("Wireless Keyboard");
    done(null);
  });

  it("Testing get product by Id with valid productId", function (done) {
    productsService.getProductsById(2, (err, result) => {
      let product = JSON.parse(result);

      expect(err).to.be.equal(null);
      expect(product).to.be.an("Object");
      expect(product.id).to.be.equal(2);
      expect(product.name).to.be.equal("Power Bank");
      done(err);
    });
  });

  it("Testing get product by Id with invalid productId", function (done) {
    productsService.getProductsById(9, (err, result) => {
      expect(err).to.not.be.equal(null);
      expect(err).to.be.equal("Requested product doesn't exist..!");
      done(null);
    });
  });

  it("Testing save product by providing product which is not already present in products list", function (done) {
    let newProduct = {
      "id": 5,
      "name": "Fridge",
      "description": "A fridge to store food",
      "price": 10000,
      "quantity": 10
    }

    productsService.saveProduct(newProduct, (err, result) => {
      let products = JSON.parse(result);

      expect(err).to.be.equal(null);
      expect(products.length).to.be.equal(5);
      expect(products[0].name).to.be.equal("LED Monitor");
      expect(products[1].name).to.be.equal("Power Bank");
      expect(products[2].name).to.be.equal("Optical Mouse");
      expect(products[3].name).to.be.equal("Wireless Keyboard");
      expect(products[4].name).to.be.equal("Fridge");
      done(err);
    });
  });

  it("Testing save product by providing product which is already present in products list", function (done) {
    let newProduct = {
      "id": 3,
      "name": "Optical Mouse",
      "description": "An optical mouse for your desktops and laptops",
      "price": 25,
      "quantity": 1
    }

    productsService.saveProduct(newProduct, (err, result) => {
      expect(err).to.not.be.equal(null);
      expect(err).to.be.equal("Product already exists..!");
      done(null);
    });
  });

  it("Test update product with valid productId", function (done) {
    let updateData = {
      "name": "Mobile",
      "description": "A mobile to operate",
      "price": 100000,
      "quantity": 5
    }

    productsService.updateProduct(3, updateData, (err, result) => {
      let products = JSON.parse(result);

      expect(err).to.be.equal(null);
      expect(products[2].id).to.be.equal(3);
      expect(products[2].name).to.be.equal("Mobile");
      expect(products[2].price).to.be.equal(100000);
      done(err);
    });
  });

  it("Test update product with invalid productId", function (done) {
    let updateData = {
      "name": "Mobile",
      "description": "A mobile to operate",
      "price": 100000,
      "quantity": 5
    }

    productsService.updateProduct(10, updateData, (err, result) => {
      expect(err).to.be.equal("Requested product doesn't exist..!");
      done(null);
    });
  });

  it("Test delete product with valid productId", function (done) {
    productsService.deleteProduct(3, (err, result) => {
      let products = JSON.parse(result);

      expect(err).to.be.equal(null);
      expect(products.length).to.be.equal(4);
      expect(products[0].name).to.be.equal("LED Monitor");
      expect(products[1].name).to.be.equal("Power Bank");
      expect(products[2].name).to.be.equal("Wireless Keyboard");
      expect(products[3].name).to.be.equal("Fridge");
      done(err);
    });
  });

  it("Test delete product with invalid productId", function (done) {
    productsService.deleteProduct(10, (err, result) => {
      expect(err).to.be.equal("Requested product doesn't exist..!");
      done(null);
    });
  });
});