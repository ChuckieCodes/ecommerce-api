const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [ 
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then((data) => res.json(data))
  .catch((error) => {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json(error);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }, 
    attributes: ['category_name', 'id'],
    include: [ 
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
      }
    ]
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({ message: `No category matches id: ${req.params.id}`});
      return;
    }
    res.json(data);
  })
  .catch((error) => {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then((data) => res.json(data))
  .catch((error) => {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json(error);
  });
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
  {
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({ message: `No category matches id: ${req.params.id}`});
      return;
    }
    res.json(data);
  })
  .catch((error) => {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json(error);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({ message: `No category matches id: ${req.params.id}`});
      return;
    }
    res.json(data);
  })
  .catch((error) => {
    console.log(`Something went wrong: ${error}`);
    res.status(500).json(error);
  });
});

module.exports = router;
