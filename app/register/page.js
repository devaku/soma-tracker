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
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-green-800 mb-2">
						Create Account
					</h1>
					<p className="text-green-600 text-sm">
						Join SOMA Tracker to start your wellness journey.
					</p>
				</div>

				{/* Register Form */}
				<div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
					<form
						className="space-y-6"
						onSubmit={(e) => e.preventDefault()}
					>
						{/* Name Fields Row */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							{/* First Name Field */}
							<div>
								<label
									htmlFor="firstname"
									className="block text-sm font-medium text-green-800 mb-2"
								>
									First Name
								</label>
								<div className="relative">
									<input
										type="text"
										name="firstname"
										id="firstname"
										value={first_name}
										onChange={handleFirstNameChange}
										placeholder="First name"
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
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
								</div>
							</div>

							{/* Last Name Field */}
							<div>
								<label
									htmlFor="lastname"
									className="block text-sm font-medium text-green-800 mb-2"
								>
									Last Name
								</label>
								<div className="relative">
									<input
										type="text"
										name="lastname"
										id="lastname"
										value={last_name}
										onChange={handleLastNameChange}
										placeholder="Last name"
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
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>

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
									onChange={handlePassword}
									placeholder="Create a secure password"
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

						{/* Create Account Button */}
						<div>
							<button
								onClick={handleSubmitClick}
								className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-md"
							>
								Create Account
							</button>
						</div>

						{/* Divider */}
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-green-200"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-green-600">
									Already have an account?
								</span>
							</div>
						</div>

						{/* Back to Login Button */}
						<div>
							<button
								onClick={handleBackClick}
								className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
							>
								Back to Sign In
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
