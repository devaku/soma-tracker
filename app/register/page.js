'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/services/api';

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
		<main className="flex flex-col mx-auto items-center mt-20 border border-gray-300 bg-white w-fit p-10">
			<h1 className="font-bold text-4xl text-left w-full mb-1">
				Register
			</h1>
			<h2 className="text-gray-500 text-left w-full mb-8">
				Enter account information
			</h2>
			<div className="border border-gray-300 w-[400px] mb-5">
				<input
					className="p-2 w-full"
					onChange={handleEmailChange}
					type="email"
					name="email"
					id=""
					placeholder="Email address"
				/>
			</div>
			<div className="border border-gray-300 w-[400px] mb-5">
				<input
					className="p-2 w-full"
					onChange={handlePassword}
					type="text"
					name="lastname"
					id=""
					placeholder="Password"
				/>
			</div>
			<div className="border border-gray-300 w-[400px] mb-5">
				<input
					className="p-2 w-full"
					onChange={handleFirstNameChange}
					type="text"
					name="firstname"
					id=""
					placeholder="First Name"
				/>
			</div>
			<div className="border border-gray-300 w-[400px] mb-5">
				<input
					className="p-2 w-full"
					onChange={handleLastNameChange}
					type="text"
					name="lastname"
					id=""
					placeholder="Last Name"
				/>
			</div>

			<div className="w-[70%] bg-blue-500 py-2 mb-3 text-white rounded-md hover:bg-blue-600 hover:cursor-pointer">
				<button
					className="w-full hover:cursor-pointer"
					onClick={handleSubmitClick}
				>
					Submit
				</button>
			</div>
			<div className="w-[70%] border border-gray-300 py-2 mb-3 rounded-md hover:bg-gray-100 hover:cursor-pointer">
				<button
					className="w-full hover:cursor-pointer"
					onClick={handleBackClick}
				>
					Back
				</button>
			</div>
		</main>
	);
}
