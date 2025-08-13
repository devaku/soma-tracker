'use client';

import { useUserAuth } from '@/lib/context/auth_context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LandingPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { emailSignIn } = useUserAuth();
	const router = useRouter();

	async function handleLogin() {
		try {
			// Debug for now
			await emailSignIn('email@email.com', 'password');
			router.push('/home');
		} catch (e) {
			console.log(e);
		}
	}

	function handleEmailChange(e) {
		setEmail(e.target.value);
	}

	function handlePasswordChange(e) {
		setPassword(e.target.value);
	}

	function handleRegister() {
		router.push('/register');
	}

	return (
		<main className="flex flex-col mx-auto items-center mt-20 border border-gray-300 bg-white w-fit p-10">
			<h1 className="font-bold text-4xl text-left w-full mb-1">
				Welcome
			</h1>
			<h2 className="text-gray-500 text-left w-full mb-8">
				Login or Register
			</h2>
			<div className="border border-gray-300 w-[400px] mb-5">
				<input
					className="p-2 w-full"
					type="email"
					name="email"
					id=""
					placeholder="Enter address"
				/>
			</div>
			<div className="border border-gray-300 w-[400px] mb-5">
				<input
					className="p-2 w-full"
					type="password"
					name="password"
					id=""
					placeholder="Password"
				/>
			</div>
			<div className="w-[70%] bg-blue-500 py-2 mb-3 text-white rounded-md hover:bg-blue-600 hover:cursor-pointer">
				<button
					className="w-full hover:cursor-pointer"
					onClick={handleLogin}
				>
					Login
				</button>
			</div>
			<div className="w-[70%] border border-gray-300 py-2 mb-3 rounded-md hover:bg-gray-100 hover:cursor-pointer">
				<button
					className="w-full hover:cursor-pointer"
					onClick={handleRegister}
				>
					Register
				</button>
			</div>
		</main>
	);
}
