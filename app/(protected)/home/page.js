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
		<main>
			<div>
				<p className="font-bold">Enter Exercise</p>
				<div>
					<label htmlFor="exercise_name">Exercise Name: </label>
					<input
						className="border-2 border-black"
						onChange={handleExerciseNameChange}
						type="text"
						name="exercise_name"
						id=""
					/>
				</div>
				<div>
					<button
						className="p-2 rounded-xl bg-sky-500 cursor-pointer"
						onClick={handleSubmitExerciseClick}
					>
						Search Exercise
					</button>
				</div>
			</div>
			<div>
				<p className="font-bold">Exercise List</p>
				{userExcerciseList.map((item, index) => {
					return (
						<div key={index}>
							<p>Name: {item.name}</p>
							<p>Calories Per Hour: {item.calories_per_hour}</p>
							<p>
								Duration (in minutes): {item.duration_minutes}
							</p>
							<p>Total calories: {item.total_calories} </p>
						</div>
					);
				})}
			</div>
			<div>
				<p className="font-bold">Food List</p>
				<div>
					<p>Name: </p>
					<p>Calories: </p>
					<p>Serving Size (g): </p>
					<p>Total Fat (g): </p>
					<p>Saturated Fat (g):</p>
					<p>Protein (g): </p>
					<p>Sodium (mg): </p>
					<p>Potassium (mg): </p>
					<p>Cholesterol (mg): </p>
					<p>Total Carbohydrates (g):</p>
					<p>Fiber (g): </p>
					<p>Sugar (g): </p>
				</div>
			</div>
			<div>
				<button
					className="p-2 rounded-xl bg-sky-500 cursor-pointer"
					onClick={handleLogout}
				>
					Logout
				</button>
			</div>
		</main>
	);
}
