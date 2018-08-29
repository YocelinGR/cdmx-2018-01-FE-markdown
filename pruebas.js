const fs = require('fs'); // Accede al CRUD de archivos desde node.js
const http = require('http');
const path = require('path'); // Modulo para la manipulación y transformación de rutas de archivos. 

/* fs.readFile('README.md', 'utf-8',(error, data) => {
	if(error) {
		console.log(`Error ${error}`);
	} else {
		let stringData = data;
		console.log(typeof(data));
		console.log(stringData);
	}
}); */

var parseDirectory = function (startPath) {
	fs.readdir(startPath, function (err, files) {
	  for(var i = 0; i < files.length; i++) {
		checkFile(startPath + '/' + files[i]);
	  }
	});
  };
  
  var checkFile = function (path) {
	fs.stat(path, function (err, stats) {
	  if (stats.isFile()) {
		console.log(path + ' is a file.');
	  }
	  else if (stats.isDirectory()) {
		console.log(path + ' is a directory.');
		parseDirectory(path);
	  }
	});
  };
  
  
  parseDirectory('C:/Users/YOCELIN/Documents/Laboratoria/javascript');