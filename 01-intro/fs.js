/**
 * fs
 *
 * commonly used methods are:
 *
 * readdir() - read contents of a directory
 * readFile() - read a file
 * writeFile() - write to a file
 * unlink() - delete a file
 * mkdir() - make a directory
 * rmdir() - delete a directory
 */

const fs = require('fs');

/*
console.log("Before readdir");

// list contents in current directory
fs.readdir('.', (err, files) => {
	console.log("The contents in the current directory is:");
	console.log(files);
});

console.log("After readdir");
*/

console.log("Before reading file");

fs.readFile('./data/oneliners.txt', 'utf8', (err, data) => {
	console.log("File length:");
	console.log(data.length);
	console.log();

	console.log("File contents:");
	console.log(data);
	console.log();
});

console.log("After reading file");
