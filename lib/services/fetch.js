const EXERCISE_URL = 'https://api.api-ninjas.com/v1/caloriesburned';

export async function fetchExercise(name) {
	try {
		let url = `${EXERCISE_URL}?activity=${name}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_API_KEY,
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				return res;
			})
			.catch((e) => {
				console.log(e);
			});

		return response;
	} catch (error) {
		console.log(error);
	}
}
