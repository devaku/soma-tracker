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
