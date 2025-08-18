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

export async function deleteExercise(userId, id) {
	const url = `${API_URL}/api/v1/exercises/${id}?userId=${userId}`;
	try {
		const response = await fetch(url, {
			method: 'DELETE',
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

export async function createMeal(userId, mealArray) {
	const url = `${API_URL}/api/v1/meals`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId,
				meals: mealArray,
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

export async function deleteMeal(userId, id) {
	const url = `${API_URL}/api/v1/meals/${id}?userId=${userId}`;
	try {
		const response = await fetch(url, {
			method: 'DELETE',
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

export async function readAllMeals(userId) {
	const url = `${API_URL}/api/v1/meals?userId=${userId}`;
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
