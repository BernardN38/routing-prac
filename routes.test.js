const request = require('supertest');
const app = require('./index');

beforeEach(function() {
	items.push(
		{ name: 'Hershey', price: '1.50' },
		{ name: 'Snickers', price: '1.99' },
		{ name: 'Skittles', price: '0.99' },
		{ name: 'Reeses', price: '1.75' }
	);
});

afterEach(function() {
	items.length = 0;
});

describe('GET /items', function() {
	test('show items', async () => {
		const resp = await request(app).get('/api/items');
		expect(resp.body).toEqual({
			items: [
				{ name: 'Hershey', price: '1.50' },
				{ name: 'Snickers', price: '1.99' },
				{ name: 'Skittles', price: '0.99' },
				{ name: 'Reeses', price: '1.75' }
			]
		});
	});
});

describe('POST /items', function() {
	test('add item', async () => {
		const resp = await request(app).post('/api/items').send({ name: 'Hot Cheetos', price: '1.99' });
		expect(resp.body).toEqual({ added: { name: 'Hot Cheetos', price: '1.99' } });
		expect(items).toEqual([
			{ name: 'Hershey', price: '1.50' },
			{ name: 'Snickers', price: '1.99' },
			{ name: 'Skittles', price: '0.99' },
			{ name: 'Reeses', price: '1.75' },
			{ name: 'Hot Cheetos', price: '1.99' }
		]);
	});
});

describe('PATCH /items/:name', function() {
	test('update item', async () => {
		const resp = await request(app).patch('/api/items/Snickers').send({ name: 'Snickers', price: '0.99' });
		expect(resp.body).toEqual({ updated: { name: 'Snickers', price: '0.99' } });
		expect(items).toEqual([
			{ name: 'Hershey', price: '1.50' },
			{ name: 'Snickers', price: '0.99' },
			{ name: 'Skittles', price: '0.99' },
			{ name: 'Reeses', price: '1.75' }
		]);
	});
});

describe('DELETE /items/:name', function() {
	test('delete item', async () => {
		const resp = await request(app).del('/api/items/Skittles');
		expect(resp.body).toEqual({ message: 'deleted' });
		expect(items).toEqual([
			{ name: 'Hershey', price: '1.50' },
			{ name: 'Snickers', price: '1.99' },
			{ name: 'Reeses', price: '1.75' }
		]);
	});
});
