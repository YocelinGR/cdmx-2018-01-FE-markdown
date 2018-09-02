let express = require('express');
let app = express();

console.log(__dirname);
app.get('/', (req, res) => {
	res.sendFile(__dirname + './app.js');
});
app.listen(3000, () => {
	console.log('Servidor en puerto 3000');
});