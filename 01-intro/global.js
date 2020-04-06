/**
 * global
 */

console.log("Hello, node.js!");

// setTimeout(() => {
// 	console.log("I'll be back!");
// }, 3000);

let counter = 0;
setInterval(function() {
	counter = counter + 2;
	console.log(`Hello after ${counter} seconds`);
}, 2000);

console.log("Bye now... (wave)");
