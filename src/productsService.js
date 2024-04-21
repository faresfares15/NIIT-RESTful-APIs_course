// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;

const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
};

const getProductsById = (productId, done) => {
  if (!productId) return done(true, JSON.stringify(productsList));
  let product = null;

  // get a product by ID
  product = productsList.find((t) => t.id === productId);
  if (!product)
    return done(
      "Requested product doesn't exist..!",
      JSON.stringify(productsList),
    );

  return done(null, JSON.stringify(product));
};

const saveProduct = (newProduct, done) => {
  if (!newProduct) return done(true, JSON.stringify(productsList));
  if (productsList.find((product) => product.id === newProduct.id))
    return done("Product already exists..!", JSON.stringify(productsList));
  // save a product
  productsList.push(newProduct);

  return done(null, JSON.stringify(productsList));
};

const updateProduct = (productId, updateData, done) => {
  if (!productId || !updateData)
    return done(
      "Requested product doesn't exist..!",
      JSON.stringify(productsList),
    );
  if (productId > productsList.length)
    return done(
      "Requested product doesn't exist..!",
      JSON.stringify(productsList),
    );

  let updatedProductList = productsList;
  const productIndex = productsList.findIndex(
    (product) => product.id === productId,
  );
  updatedProductList[productIndex] = { id: productId, ...updateData };

  // update the product list
  done(null, JSON.stringify(updatedProductList));
};

const deleteProduct = (productId, done) => {
  if (!productId) done(true, JSON.stringify(productsList));
  if (productId > productsList.length)
    done("Requested product doesn't exist..!", JSON.stringify(productsList));

  // delete a product
  const updateProductsList = productsList.filter(
    (product) => product.id !== productId,
  );

  return done(null, JSON.stringify(updateProductsList));
};

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
