const express = require('express');
const router = new express.Router();
let items = require('./fakeDb')

router.get('/items', (req, res) => {
	res.json({ items });
});

router.post('/items', (req, res) => {
	const { name, price } = req.body;
	items.push({ name: name, price: price });
	res.json({ added: { name: `${name}`, price: `${price}` } });
});

router.get('/items/:name', (req, res) => {
	let item = items.find((item) => item.name == req.params.name);
	res.json(item);
});

router.patch('/items/:name', (req, res) => {
	let item = items.find((item) => item.name == req.params.name);
	item.name = req.body.name;
	item.price = req.body.price;
	res.json({ updated: item });
});

router.delete('/items/:name', (req, res) => {
	let item = items.findIndex(item => item.name == req.params.name)
    items.splice(item,1)
	res.json({ message: 'deleted' });
});

module.exports = router;