'use client';

import { useUserAuth } from '@/lib/context/auth_context';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
	const { emailSignIn } = useUserAuth();
	const router = useRouter();

	async function handleLogin() {
		try {
			await emailSignIn('email@email.com', 'password');
			router.push('/home');
		} catch (e) {
			console.log(e);
		}
	}

	function handleRegister() {
		router.push('/register');
	}

	return (
		<main>
			<div>
				<button onClick={handleLogin}>Login</button>
				<br />
				<button onClick={handleRegister}>Register</button>
			</div>
		</main>
	);
}
