const axios = require('axios');

const Gpio = require('onoff').Gpio;
const Button = new Gpio(17, 'in', 'rising', { debounceTimeout: 100 });

const SlackURL = 'https://hooks.slack.com/workflows/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'

let status = true

const sendMessage = () => {
	axios
		.post(`${SlackURL}`)
		.then(function(response) {
			console.log('Messaggio inviato');
		})
		.catch(function(error) {
			console.log(error);
		});
}


Button.watch((err, value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function
	if (err) { //if an error
		console.error('There was an error', err); //output error message to console
		return;
	}
	if (value) {
		console.log(value)
		sendMessage()
	}
});

const unexportOnClose = () => { //function to run when exiting program
	Button.unexport(); // Unexport Button GPIO to free resources
};



process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c
