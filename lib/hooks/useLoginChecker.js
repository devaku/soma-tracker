import { useRouter } from 'next/navigation';
import { useUserAuth } from '../context/auth_context';
import { useEffect } from 'react';

export function useLoginChecker() {
	const { user } = useUserAuth();
	const router = useRouter();
	useEffect(() => {
		if (!user) {
			router.replace('/');
		}
	}, []);
}
