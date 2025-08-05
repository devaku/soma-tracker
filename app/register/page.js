'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/services/fetch';

export default function RegisterPage() {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const router = useRouter();

	function handleFirstNameChange(e) {
		setFirstName(e.target.value);
	}

	function handleLastNameChange(e) {
		setLastName(e.target.value);
	}

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePassword(e) {
		setPassword(e.target.value);
	}

	async function handleSubmitClick() {
		try {
			// TODO: There are SO MANY SAFEGUARDS
			// that need to be put on this function
			// but whatever
			let response = await createUser(
				email,
				password,
				first_name,
				last_name
			);
			router.push('/');
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
		}
	}

	function handleBackClick() {
		router.push('/');
	}

	return (
		<div>
			<div>
				<label htmlFor="email">Email: </label>
				<input
					onChange={handleEmailChange}
					type="email"
					name="email"
					id=""
				/>
			</div>
			<div>
				<label htmlFor="lastname">Password: </label>
				<input
					onChange={handlePassword}
					type="text"
					name="lastname"
					id=""
				/>
			</div>
			<div>
				<label htmlFor="firstname">First Name: </label>
				<input
					onChange={handleFirstNameChange}
					type="text"
					name="firstname"
					id=""
				/>
			</div>

			<div>
				<label htmlFor="lastname">Last Name: </label>
				<input
					onChange={handleLastNameChange}
					type="text"
					name="lastname"
					id=""
				/>
			</div>

			<div>
				<button onClick={handleSubmitClick}>Submit</button>
				<button onClick={handleBackClick}>Back</button>
			</div>
		</div>
	);
}
