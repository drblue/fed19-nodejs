/**
 * events
 */
const events = require('events');

class Person extends events.EventEmitter{
	constructor(name){
		super();
		this.name = name;
	}
}

let derek = new Person('Derek'); // https://www.youtube.com/channel/UCHnyfMqiRRG1u-2MsSQLbXA
let linus = new Person('Linus'); // https://www.youtube.com/user/LinusTechTips
let simone = new Person('Simone'); // https://www.youtube.com/channel/UC3KEoMzNz8eYnwBC34RaKCQ
let tom = new Person('Tom'); // https://www.youtube.com/channel/UCBa659QWEk1AI4Tg--mrJ2A
let people = [derek, linus, simone, tom];

people.forEach(person => {
	person.on('speak', (msg, scream = false) => {
		console.log(`${person.name} said: ${scream ? msg.toUpperCase() : msg}\n`);
	});
});

derek.emit('speak', 'In Quantum Mechanics, if you know the Quantum State of a particle, that is it\'s wave function you can use the Schrodinger equation to calculate what that particle will do in the future.');

linus.emit('speak', 'But it has basically zero competition in this price bracket, so we absolutely needed to take a look at it. Just like I need to tell you about our sponsor - Storyblocks!', true);

simone.emit('speak', 'My track record isn\'t terribly impressive so far, but I have an angle grinder, and a welder, and I\'m not afraid to use them.');
