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
			sendButton('What subject would you like study now?',
				[{ title: 'Precalculus🤩', payload: 'precalculus-N' },
				{ title: 'Calculus😎', payload: 'calculus-N' },
				{ title: 'Algebra🤠', payload: 'algebra-N' },
				{ title: 'Geometry😝', payload: 'geometry-N' },
				{ title: 'Trigonometry😋', payload: 'trigonometry-N' }]);

		});

	}

	input_ary = payload.split('-');
	topic = input_ary[0];
	if (payload === topic + '-N') {
		if (topic === 'precalculus') {
			const str = 'Great! Precalculus it is!🥳';
			say(str).then(() => {
				sendButton('So many topics to choose! Which one do you want to study?🤔',
					[{ title: 'Introduction', payload: 'precalculus-introduction-N' },
					{ title: 'Graphs', payload: 'precalculus-graphs-N' },
					{ title: 'Lines & Rates of Change', payload: 'precalculus-lines-N' },
					{ title: 'Polynomials', payload: 'precalculus-polynomials-N' },
					{ title: 'Limits', payload: 'precalculus-limits-N' },
					{ title: 'Logarithms', payload: 'precalculus-logarithms-N' },
					{ title: 'Exponentials', payload: 'precalculus-exponentials-N' },
					{ title: 'General Overview', payload: 'precalculus-overview-N' }]);

			});
		}

		if (topic === 'trigonometry') {
			const str = 'Awesome! Let\'s learn Trigonometry!🥳';
			say(str).then(() => {
				sendButton('So many topics to choose! Which one do you want to study?🤔',
					[{ title: 'Introduction', payload: 'trigonometry-introduction-N' },
					{ title: 'Trigonometric Functions', payload: 'trigonometry-functions-N' },
					{ title: 'Identities', payload: 'trigonometry-identities-N' },
					{ title: 'Applications', payload: 'trigonometry-applications-N' },
					{ title: 'Unit Circle', payload: 'trigonometry-unit circle-N' },
					{ title: 'Special Triangles', payload: 'trigonometry-special triangles-N' },
					{ title: 'General Overview', payload: 'trigonometry-overview-N' }]);

			});
		}

		if (topic === 'calculus') {
			const str = 'Nice! Let\'s master Calculus!😈';
			say(str).then(() => {
				sendButton('So many topics to choose! Which one do you want to study?🤔',
					[{ title: 'Introduction', payload: 'calculus-introduction-N' },
					{ title: 'Integrals', payload: 'calculus-integrals-N' },
					{ title: 'Derivatives', payload: 'calculus-derivatives-N' },
					{ title: 'Inverse trigonometry', payload: 'calculus-inverse trigonometry-N' },
					{ title: 'Special Functions', payload: 'calculus-special functions-N' },
					{ title: 'General Overview', payload: 'calculus-overview-N' }]);

			});
		}

		if (topic === 'algebra') {
			const str = 'Algebra here we come!🤪';
			say(str).then(() => {
				sendButton('So many topics to choose! Which one do you want to study?🤔',
					[{ title: 'Introduction', payload: 'algebra-introduction-N' },
					{ title: 'Linear Equations', payload: 'algebra-linear equations-N' },
					{ title: 'Quadratic Equations', payload: 'algebra-quadratic equations-N' },
					{ title: 'Functions', payload: 'algebra-functions-N' },
					{ title: 'Polynomials', payload: 'algebra-polynomials-N' },
					{ title: 'Exponentials', payload: 'algebra-exponentials-N' },
					{ title: 'General Overview', payload: 'algebra-overview-N' }]);

			});
		}

		if (topic === 'geometry') {
			const str = 'Excellent! Let\'s tackle some geometry!🥳';
			say(str).then(() => {
				sendButton('So many topics to choose! Which one do you want to study?🤔',
					[{ title: 'Introduction', payload: 'geometry-introduction-N' },
					{ title: 'Triangles', payload: 'geometry-triangles-N' },
					{ title: 'Proofs', payload: 'geometry-proofs-N' },
					{ title: 'Similarity', payload: 'geometry-similarity-N' },
					{ title: 'Transformations', payload: 'geometry-transformations-N' },
					{ title: 'Area', payload: 'geometry-area-N' },
					{ title: 'Quadrilaterals', payload: 'geometry-quadrilaterals-N' },
					{ title: 'Points, Lines, and Planes', payload: 'geometry-points lines planes-N' },
					{ title: 'General Overview', payload: 'geometry-overview-N' }]);

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
		say("Great!💪 Now let us do the work and find the perfect video for you!🎬")
		say("Right when we get the video, we'll send you the link to view it!")
		axios({
			method: 'post', //post or get?
			baseURL: 'http://34.96.245.124:2305', //our server url
			url: '/NemoText',
			'Content-Type': 'application/json',
			data: {
				specifics: inputString
			}
		})
			.then((response) => {
				if (response.data == 'done') {
					say("Your video can be viewed on http://34.96.245.124:2305/search 🎬")
					sendButton("Try again?", [{ title: 'Yes', payload: 'restart' }, 'No']);
				}
			})
			.catch((err) => {
				console.error(err)
				say("We encountered an error! 😢🎬")
				sendButton("Sorry this is unusual! Try again?", [{ title: 'Yes', payload: 'restart' }, 'No'])
			})

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
