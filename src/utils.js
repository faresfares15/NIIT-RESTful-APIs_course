const url = require("node:url");
const productsList = require("./products.json").products;
const getRequestData = (req) => {
  // Write logic here to read the request body data
  return new Promise((resolve, reject), () => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      resolve(error);
    }
  });
};
const getID = (url) => {
  return url.split("/")[3];
};
const getProduct = (productID) => {
  return productsList.find((product) => product.id === productID);
};

module.exports = { getRequestData, getID, getProduct };
