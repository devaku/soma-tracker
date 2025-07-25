'use client';

import { useContext, createContext, useState, useEffect } from 'react';
import {
	signInWithPopup,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	GithubAuthProvider,
} from 'firebase/auth';
import { auth } from '../services/firebase.js';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	const gitHubSignIn = () => {
		const provider = new GithubAuthProvider();
		return signInWithPopup(auth, provider);
	};

	const firebaseSignOut = () => {
		return signOut(auth);
	};

	function emailSignIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password)
			.then((userCreds) => {
				console.log('SUCCESSFULLY LOGGED USER IN');
				setUser(userCreds.user);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, emailSignIn, firebaseSignOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(AuthContext);
}
