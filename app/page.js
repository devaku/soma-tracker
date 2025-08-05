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
		<main>
			<div>
				<label htmlFor="email">Email: </label>
				<input type="email" name="email" id="" />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="" />
			</div>
			<div>
				<button onClick={handleLogin}>Login</button>
				<br />
				<button onClick={handleRegister}>Register</button>
			</div>
		</main>
	);
}
