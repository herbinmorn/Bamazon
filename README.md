# Bamazon

Bamazon is an Amazon-like storefront with: The app will take in orders from customers and deplete stock from the store's inventory. Bamazon is a command line node app that takes in parameters and update the corresponding database 'bamazon_db' in MySQL Workbench.

I used the following Node packages in Bamazon:
* inquirer
* mysql

There are 3 node applications:
see the video below for running these apps
https://drive.google.com/file/d/1cZgPqUJieG2NrAY4hgMRCuQReviCndQX/view

1. node bamazonCustomer.js

- List all items available for sale and ask the customers 2 questions: 
  - the ID of the products they would like to buy 
  - how many units of the products they would like to buy

- If the store has enough products, the Customers' order would be fulfilled


- If the store does NOT have enough of the products, the app will log 'Insufficient quantity!'


2. node bamazonManager.js

- Running this application will:
  - List a set of menu options:
  - View Products for Sale
  - View Low Inventory
  - Add to Inventory
  - Add New Product

- If a manager selects 'View Products for Sale', the app should list every available item: the item IDs, names, prices, and quantities.
- If a manager selects 'View Low Inventory', then it should list all items with an inventory count lower than five.
- If a manager selects 'Add to Inventory', your app should display a prompt that will let the manager "add more" of any item currently in the store.
- If a manager selects 'Add New Product', it should allow the manager to add a completely new product to the store.

Here is the deployed link:  (https://herbinmorn.github.io/Bamazon/)

I am the only contributor of this app.