'use client';
import { useUserAuth } from '@/lib/context/auth_context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginChecker } from '@/lib/hooks/useLoginChecker';

export default function HomePage() {
	useLoginChecker();
	const { user, firebaseSignOut } = useUserAuth();
	const router = useRouter();
	useLoginChecker();

	function handleLogout() {
		firebaseSignOut();
		router.replace('/');
	}

	return (
		<main>
			<div>
				<button onClick={handleLogout}>Logout</button>
			</div>
		</main>
	);
}
