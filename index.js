const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

// GET all products
app.get('/products', (req, res) => {
    res.send(products);
  });
  
// GET a single product by ID
  app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      res.send(product);
    }
  });
  
// POST 
  app.post('/products', (req, res) => {
    const product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price
    };
    
    console.log(`New product created: ${JSON.stringify(product)}`);
    
    res.status(201).json({
      message: 'Product created successfully',
      product: product
    });
    products.push(product);
    res.send(product);
  });
  
// PUT 
  app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === parseInt(id));
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    product.name = req.body.name;
    product.price = req.body.price;
  
    console.log(`Product updated: ${JSON.stringify(product)}`);
  
    res.json({ message: 'Product updated successfully', product: product });
  });

  
// DELETE 
  app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find((p) => p.id === id);
    if (!product) {
      res.status(404).send('Product not found');
    } else {
      const index = products.indexOf(product);
      products.splice(index, 1);
      res.send(product);
    }
  });

//Starting the server on port 3000
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
