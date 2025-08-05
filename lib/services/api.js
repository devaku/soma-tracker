const API_URL = 'http://localhost:8080';

export async function createUser(email, password, first_name, last_name) {
	const url = `${API_URL}/api/v1/users`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				first_name,
				last_name,
			}),
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
		console.error(error.message);
	}
}

export async function createExercise(userId, exerciseArray) {
	const url = `${API_URL}/api/v1/exercises`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId,
				exercises: exerciseArray,
			}),
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
		console.error(error.message);
	}
}

export async function readAllExercise(userId) {
	const url = `${API_URL}/api/v1/exercises?userId=${userId}`;
	try {
		const response = await fetch(url, {
			method: 'GET',
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
		console.error(error.message);
	}
}
