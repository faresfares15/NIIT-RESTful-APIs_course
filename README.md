# Problem Statement - Product​

Ecommerce is the buying and selling of products on the internet. The products that are sold on any e-commerce website are the core of the business. Consumers add products to their shopping carts, pay the amount online and buy the products. Sometimes, at the check-out, a consumer may delete a product from the cart, update the count of the products, etc. The application should be able to handle all the consumer requirements to give them a good shopping experience.

Build a REST API using vanilla JS to manage the product details and add new products, fetch all the products available, fetch a specific product by id, delete a product and update the details of a specific product.

## Tasks

- Create a HTTP server to service requests from clients​
- Define all HTTP methods like GET, POST, PUT and DELETE​
- Define routes to​
- Get all the products​
- Get a product by productid​
- Create a new product and post the data​
- Update the details of a specific product​
- Delete a product by productid​
- Test the output in the REST Client Postman​
​

# Instructions

1. Download and unzip the boilerplate code.
2. Run the command `npm install` to install the dependencies.
3. Open the boilerplate code in VSCode to develop the solution.
4. Write the logic for the application in the **productsService.js** file in the **src** folder
5. Write logic to read the request body data in the **utils.js** file in the **src** folder
6. Create the server in the **app.js** file and use the functions of the **productsService.js**

## Running the code

- Execute the `npm start` command to start the application
- Test all REST end points on **POSTMAN**

## Testing the application

- Run the test scripts available under **src/test** by giving `npm run test` command in the terminal to test locally.
- Refactor the solution to ensure all test cases are passing.
- Zip the solution code with the name same as assignment name.
- Upload the zipped solution for submission.
