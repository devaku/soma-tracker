'use client';

import { useUserAuth } from '@/lib/context/auth_context';
import { redirect } from 'next/navigation';
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

	return (
		<main>
			<div>
				<button onClick={handleLogin}>Login</button>
			</div>
		</main>
	);
}
