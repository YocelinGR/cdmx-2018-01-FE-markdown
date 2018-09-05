const fs = require('fs'); // Accede al CRUD de archivos desde node.js
const fetch = require('node-fetch'); // Requerir fetch para peticiones a urls

// Realiza las peticiones fetch a las urls para comprobar su estado
const fetchRequest = (text, url) => {
	let urlsArray = []; 
	fetch(url)
		.then(res => {
			if (res.status === 404) {
				urlsArray.push({ // Retorna objeto con error 
					url: url,
					status: 'Error, url rota',
					texto: text
				});
			}
			else { 
				urlsArray.push({ // Retorna objeto con resp exitosa
					url: url,
					status: 'Ok, url activa',
					textto: text  
				});
			}
			return urlsArray;
		})
		.then(post => { 
			console.log(post);
		})
		.catch(error => {
			console.log('Error', error);
		});
};
// Realiza las peticiones fetch por cada url del arreglo existente
const httpPetitions = (arrayText, arrayURL) => {
	let peticiones = [];
	for (let i=0; i<arrayURL.length; i++) {
		peticiones[i] = fetchRequest(arrayText[i].toString(), arrayURL[i]);
	}
};
// Separa linea por linea del doc .md y busca concidencias con urls
const separeteLines = (stringData) => {
	let lines = stringData.split('\n');
	let documentURL = [];
	let lineWithUrl = '';
	let aux = '';
	let aux2 = '';
	let auxText ='';
	let textFromURL = [];
	for (let i=0; i<lines.length;i++){
		lineWithUrl = lines[i].match(/(ftp|http|https|www):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi);
		if(lineWithUrl == null){
		} else {
			auxText = lines[i].match(/\[([^\]]+)]/g);
			if(auxText == null){
				textFromURL.push('Texto sin URL');
			} else {
				textFromURL.push(auxText);
			}
			aux = lineWithUrl.toString();
			if(aux[aux.length-1] == ')'){
				aux2 = aux.slice(0, -1);
				documentURL.push(aux2);
			} else if (aux[aux.length-2] == ')') {
				aux2 = aux.slice(0, -2);
				documentURL.push(aux2);
			}
			else {
				documentURL.push(aux);
			}
		}
		lineWithUrl = '';
		aux = '';
		aux2 = '';
		auxText = '';
	}
	httpPetitions(textFromURL, documentURL);
};
// Abre el documento y pide analizarlo
const goInDocument = (err, data) => {
	if(err) {
		console.log(`Archivo no encontrado. Error: ${err}`);
	} else {
		separeteLines(data);
	}
};
// Pasa documento,función y formato a la llamada fs readfile
fs.readFile('../README2.md', 'utf-8', goInDocument);

/* Funcion a exportar 
const mdLinksYGR = (path, options) => {
	return `${path} ${options}`;
}; 
module.exports = mdLinksYGR; */