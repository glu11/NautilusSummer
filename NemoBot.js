'use strict'
const axios = require('axios');


const start = (say, sendButton) => {
	sendButton("Let's start off by picking a subject!", [{ title: "Yes! Let's go! 😄", payload: '1' }]);
};

const state = (payload, say, sendButton) => {
	//Variables
	var input_ary, topic, subtopic, vidtype, results

	if (payload === '1') {
		const str = 'Welcome Back! Let\'s get ready to work!📝';
		say(str).then(() => {
			sendButton('What subject would you like study now?', [{ title: 'Precalculus🤩', payload: 'precalculus-N' }, { title: 'Calculus😎', payload: 'calculus-N' }, { title: 'Trigonometry😋', payload: 'trigonometry-N' }]);

		});

	}

	input_ary = payload.split('-');
	topic = input_ary[0];
	if (payload === topic + '-N') {
		if (topic === 'precalculus') {
			const str = 'Great! Precalculus it is!🥳';
			say(str).then(() => {
				sendButton('So many topics to choose! Which one do you want to study?🤔', [{ title: 'Graphs', payload: 'precalculus-graphs-N' }, { title: 'Lines & Rates of Change', payload: 'precalculus-lines-N' }, { title: 'Polynomials', payload: 'precalc-polynomials-N' }, { title: 'General Overview', payload: 'precalculus-overview-N' }]);

			});
		}

		if (topic === 'trigonometry') {
			const str = 'Awesome! Let\'s learn Trigonometry!🥳';
			say(str).then(() => {
				sendButton('So many topics to choose! Which one do you want to study?🤔', [{ title: 'Trigonometric Functions', payload: 'trigonometry-functions-N' }, { title: 'Identities', payload: 'trigonometry-identities-N' }, { title: 'General Overview', payload: 'trigonometry-overview-N' }]);

			});
		}
	}


	input_ary = payload.split('-');
	topic = input_ary[0];
	subtopic = input_ary[1];

	if (payload === topic + '-' + subtopic + '-N') {
		sendButton('What kind of video are you looking for?📺', [{ title: 'Short Video', payload: topic + '-' + subtopic + '-short-N' }, { title: 'Long Video', payload: topic + '-' + subtopic + '-long-N' }]);
	}
	input_ary = payload.split('-');
	topic = input_ary[0];
	subtopic = input_ary[1];
	vidtype = input_ary[2];


	if (payload === topic + '-' + subtopic + '-' + vidtype + '-N') {
		var inputString = topic + " " + subtopic + " " + vidtype
		axios({
			method: 'post', //post or get?
			baseURL: 'http://34.96.245.124:2300', //our server url
			url: '/NemoText',
			'Content-Type': 'application/json',
			data: {
				specifics: inputString
			}

		})
			.then((result) => { console.log(result.data) })
			.catch((err) => { console.error(err) })

		say("Your video can be viewed on http://34.96.245.124:2300/search")
		sendButton("Try again?", [{ title: 'Yes', payload: 'restart' }, 'No']);

	}

};

module.exports = {
	filename: 'mathvideosearch',
	title: 'Math Helper!',
	introduction: [
		'Learn or improve your Math skills!🧠💪',
		'When the game starts, you can choose the topic and video you would like to watch! 🎬'
	],
	start: start,
	state: state
};
