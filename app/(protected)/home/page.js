'use client';
import { useUserAuth } from '@/lib/context/auth_context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginChecker } from '@/lib/hooks/useLoginChecker';

import { fetchExercise } from '@/lib/services/fetch';
import { createExercise, readAllExercise } from '@/lib/services/api';

const exerciseReference = [
	{
		name: 'Skiing, water skiing',
		calories_per_hour: 435,
		duration_minutes: 60,
		total_calories: 435,
	},
	{
		name: 'Cross country snow skiing, slow',
		calories_per_hour: 508,
		duration_minutes: 60,
		total_calories: 508,
	},
	{
		name: 'Cross country skiing, moderate',
		calories_per_hour: 581,
		duration_minutes: 60,
		total_calories: 581,
	},
	{
		name: 'Cross country skiing, vigorous',
		calories_per_hour: 653,
		duration_minutes: 60,
		total_calories: 653,
	},
	{
		name: 'Cross country skiing, racing',
		calories_per_hour: 1016,
		duration_minutes: 60,
		total_calories: 1016,
	},
	{
		name: 'Cross country skiing, uphill',
		calories_per_hour: 1198,
		duration_minutes: 60,
		total_calories: 1198,
	},
	{
		name: 'Snow skiing, downhill skiing, light',
		calories_per_hour: 363,
		duration_minutes: 60,
		total_calories: 363,
	},
	{
		name: 'Downhill snow skiing, moderate',
		calories_per_hour: 435,
		duration_minutes: 60,
		total_calories: 435,
	},
	{
		name: 'Downhill snow skiing, racing',
		calories_per_hour: 581,
		duration_minutes: 60,
		total_calories: 581,
	},
];

const foodReference = [
	{
		name: 'brisket',
		calories: 1312.3,
		serving_size_g: 453.592,
		fat_total_g: 82.9,
		fat_saturated_g: 33.2,
		protein_g: 132,
		sodium_mg: 217,
		potassium_mg: 781,
		cholesterol_mg: 487,
		carbohydrates_total_g: 0,
		fiber_g: 0,
		sugar_g: 0,
	},
];

export default function HomePage() {
	const [userExcerciseList, setUserExerciseList] = useState([]);
	const [exerciseName, setExerciseName] = useState('');
	useLoginChecker();
	const { user, firebaseSignOut } = useUserAuth();

	const userId = user?.uid;
	const router = useRouter();
	useLoginChecker();

	function handleLogout() {
		firebaseSignOut();
		router.replace('/');
	}

	useEffect(() => {
		fetchAllExercises(userId);
	}, []);

	async function fetchAllExercises(givenUserId) {
		let temp = await readAllExercise(givenUserId);
		temp = temp.data;
		setUserExerciseList(temp);
	}

	async function handleSubmitExerciseClick() {
		const response = await fetchExercise(exerciseName);
		//TODO: User should be able to choose which exercise???

		if (response[0]) {
			const chosenExercise = response[0];
			await createExercise(userId, [chosenExercise]);
			await fetchAllExercises(userId);
		} else {
			alert('No exercise found');
		}
	}

	function handleExerciseNameChange(e) {
		setExerciseName(e.target.value);
	}

	return (
		<main className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
			<div className="max-w-2xl mx-auto">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-green-800 mb-2">
						Dashboard
					</h1>
					<p className="text-green-600">Your SOMA Tracker overview</p>
				</div>
			</div>

			<div className="max-w-6xl mx-auto flex gap-5 h-screen justify-evenly">
				{/* Daily Calorie Intake */}
				<div className="w-full flex flex-col gap-5">
					<div className="bg-green-50 border border-green-300 rounded-lg flex flex-col py-4 px-10">
						<h2 className="text-xl font-bold text-green-800 mb-3 text-center">
							Today's Calorie Intake
						</h2>
						<p className="text-center text-green-600 font-semibold text-3xl">
							5234 cal
						</p>
					</div>

					<div className="bg-green-50 border border-green-300 rounded-lg flex flex-col py-4 px-10">
						<h2 className="text-xl font-bold text-green-800 mb-3 text-center">
							Intake Breakdown
						</h2>
						<table className="border-spacing-y-[8px] border-separate">
							<tr>
								<th>Meal</th>
								<th>Calories</th>
							</tr>
							{foodReference.map((item, i) => {
								return i % 2 == 0 ? (
									<tr className="bg-green-100">
										<td className="p-1">{item.name}</td>
										<td>{item.calories}</td>
									</tr>
								) : (
									<tr>
										<td className="p-1">{item.name}</td>
										<td>{item.calories}</td>
									</tr>
								);
							})}
						</table>
					</div>
				</div>

				{/* Calories Burned */}
				<div className="w-full flex flex-col gap-5">
					<div className="bg-green-50 border border-green-300 rounded-lg flex flex-col py-4 px-10">
						<h2 className="text-xl font-bold text-green-800 mb-3 text-center">
							Today's Calories Burned
						</h2>
						<p className="text-center text-green-600 font-semibold text-3xl">
							4155 cal
						</p>
					</div>

					<div className="bg-green-50 border border-green-300 rounded-lg flex flex-col py-4 px-10">
						<h2 className="text-xl font-bold text-green-800 mb-3 text-center">
							Burn Breakdown
						</h2>
						<table className="border-spacing-y-[8px] border-separate">
							<tr>
								<th>Activity</th>
								<th>Duration</th>
								<th>Burned</th>
							</tr>
							{exerciseReference.map((item, i) => {
								return i % 2 == 0 ? (
									<tr className="bg-green-100">
										<td className="p-1">{item.name}</td>
										<td>{item.duration_minutes}</td>
										<td>{item.calories_per_hour}</td>
									</tr>
								) : (
									<tr>
										<td className="p-1">{item.name}</td>
										<td>{item.duration_minutes}</td>
										<td>{item.calories_per_hour}</td>
									</tr>
								);
							})}
						</table>
					</div>
				</div>
			</div>
		</main>
	);
}
