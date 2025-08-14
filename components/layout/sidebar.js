'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const navigation = [
		{
			name: 'Home',
			href: '/home',
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/>
				</svg>
			),
		},
		{
			name: 'Meals',
			href: '/meal',
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7.5M9 7v1a3 3 0 006 0V7M9 7V4a1 1 0 112 0v3M9 7h6"
					/>
				</svg>
			),
		},
		{
			name: 'Exercise',
			href: '/exercise',
			icon: (
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14l9 11v-7h14a2 2 0 002-2v-4a2 2 0 00-2-2H13z"
					/>
				</svg>
			),
		},
	];

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Mobile overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={toggleSidebar}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
					fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
					lg:translate-x-0 lg:static lg:inset-0
					${isOpen ? 'translate-x-0' : '-translate-x-full'}
				`}
			>
				{/* Sidebar Header */}
				<div className="flex items-center justify-between h-16 px-6 border-b">
					<h1 className="text-xl font-bold text-gray-800">
						SOMA Tracker
					</h1>
					<button
						onClick={toggleSidebar}
						className="lg:hidden p-1 rounded-md hover:bg-gray-100"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Navigation */}
				<nav className="mt-6 px-3">
					<ul className="space-y-1">
						{navigation.map((item) => {
							const isActive = pathname === item.href;
							return (
								<li key={item.name}>
									<Link
										href={item.href}
										onClick={() => setIsOpen(false)}
										className={`
											flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
											${
												isActive
													? 'bg-green-100 text-green-800'
													: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
											}
										`}
									>
										<span className="mr-3">
											{item.icon}
										</span>
										{item.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				{/* Sidebar Footer */}
				<div className="absolute bottom-0 w-full p-4 border-t">
					<div className="text-xs text-gray-500 text-center">
						SOMA Tracker v1.0
					</div>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Mobile Header */}
				<header className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
					<div className="flex items-center justify-between">
						<button
							onClick={toggleSidebar}
							className="p-2 rounded-md hover:bg-gray-100"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
						<h1 className="text-lg font-semibold text-gray-800">
							SOMA Tracker
						</h1>
						<div className="w-10"></div>{' '}
						{/* Spacer for centering */}
					</div>
				</header>

				{/* Main Content */}
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
					<div className="">{children}</div>
				</main>
			</div>
		</div>
	);
}
