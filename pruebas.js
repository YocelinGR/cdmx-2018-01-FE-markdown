const fs = require('fs'); // Accede al CRUD de archivos desde node.js
const fetch = require('node-fetch');
// import 'whatwg-fetch'

const fetchRequest = (url) => {
	fetch(url)
		.then(res => {
			if (res.status === 404) {
				return Promise.resolve({
					// url: url,
					status: 'Error, url rota'
				});
			}
			else { 
				return Promise.resolve({
					// url: url,
					status: 'Ok, url activa'
				});
			}
		})
		.then(post => {
			console.log(post);
		})
		.catch(error => {
			console.log('Error', error);
		});
};
const httpPetitions = (array) => {
	let peticiones = [];
	for (let i=0; i<array.length; i++) {
		peticiones[i] = fetchRequest(array[i]);
	}
	console.log(peticiones);
};
const separeteLines = (stringData) => {
	let lines = stringData.split('\n');
	let documentURL = [];
	let lineWithUrl = '';
	let aux = '';
	console.log(typeof(lines[0]));
	for (let i=0; i<lines.length;i++){
		lineWithUrl = lines[i].match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi);
		if(lineWithUrl == null){
			console.log('Error: No hay urls en esta linea');
		} else {
			aux = lineWithUrl.toString();
			documentURL.push(aux);
		}
		lineWithUrl = '';
		aux = '';
	}
	console.log(documentURL);
	httpPetitions(documentURL);
};
const goInDocument = (err, data) => {
	if(err) {
		console.log(`Archivo no encontrado. Error: ${error}`);
	} else {
		let stringData = data;
		separeteLines(stringData);
	}
};
fs.readFile('README.md', 'utf-8', goInDocument);