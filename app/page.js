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
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
						<svg
							className="h-8 w-8 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-green-800 mb-2">
						SOMA Tracker
					</h1>
					<p className="text-green-600 text-sm">
						Welcome back! Please sign in to your account.
					</p>
				</div>

				{/* Login Form */}
				<div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
					<form
						className="space-y-6"
						onSubmit={(e) => e.preventDefault()}
					>
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-green-800 mb-2"
							>
								Email Address
							</label>
							<div className="relative">
								<input
									type="email"
									name="email"
									id="email"
									value={email}
									onChange={handleEmailChange}
									placeholder="Enter your email"
									className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-800 placeholder-gray-400"
									required
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
									<svg
										className="h-5 w-5 text-green-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
										/>
									</svg>
								</div>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-green-800 mb-2"
							>
								Password
							</label>
							<div className="relative">
								<input
									type="password"
									name="password"
									id="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="Enter your password"
									className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200 text-gray-800 placeholder-gray-400"
									required
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
									<svg
										className="h-5 w-5 text-green-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
										/>
									</svg>
								</div>
							</div>
						</div>

						{/* Login Button */}
						<div>
							<button
								onClick={handleLogin}
								className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
							>
								Sign In
							</button>
						</div>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-green-200"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-green-600">
									Or
								</span>
							</div>
						</div>

						{/* Register Button */}
						<div>
							<button
								onClick={handleRegister}
								className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
							>
								Create New Account
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
