/* This file is used as a practice to understand better the recursive programming */
const fs = require('fs');
const path = require('path');

const recursiveDirectory = (dir) => {
	console.log('[+]', dir);
	const files = fs.readdirSync(dir);
	for(let file in files){
		const nextFile = path.join(dir, files[file]);
		if(fs.lstatSync(nextFile).isDirectory()==true){
			recursiveDirectory(nextFile);
		} else {
			console.log('\t', nextFile);
		}
	}
}
recursiveDirectory(__dirname);
