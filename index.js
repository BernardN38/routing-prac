const express = require('express');
const apiRoutes = require('./router')

const app = express()

app.use(express.json());

app.use('/api', apiRoutes)


app.listen(3000, () => {
	console.log('listening on port 3000');
});



module.exports = app;