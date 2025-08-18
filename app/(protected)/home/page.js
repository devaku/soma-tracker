'use client';
import { useUserAuth } from '@/lib/context/auth_context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginChecker } from '@/lib/hooks/useLoginChecker';
import {
	readAllExercise,
	deleteExercise,
	readAllMeals,
	deleteMeal,
} from '@/lib/services/api';

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
	const [userMealList, setUserMealList] = useState([]);

	const [totalCals, setTotalCals] = useState(0);
	const [totalCarbs, setTotalCarbs] = useState(0);

	useLoginChecker();
	const { user, firebaseSignOut } = useUserAuth();

	const userId = user?.uid;
	const router = useRouter();
	useLoginChecker();

	function handleLogout() {
		firebaseSignOut();
		router.replace('/');
	}

	function handleDeleteExercise(item, i) {
		deleteExercise(userId, item.exercise_id);

		let newList = [...userExcerciseList];
		newList.splice(i, 1);
		setUserExerciseList(newList);
	}

	function handleDeleteMeal(item, i) {
		deleteMeal(userId, item.meal_id);

		let newList = [...userMealList];
		newList.splice(i, 1);
		setUserMealList(newList);
	}

	useEffect(() => {
		fetchAllExercises(userId);
		fetchAllMeals(userId);
	}, []);

	async function fetchAllExercises(givenUserId) {
		let temp = await readAllExercise(givenUserId);
		temp = temp.data;
		setUserExerciseList(temp);

		let cals = 0;
		for (var i = 0; i < temp.length; i++) {
			let exercise = temp[i];
			cals +=
				(exercise.duration_minutes / 60) * exercise.calories_per_hour;
		}

		setTotalCals(Math.round(cals));
	}

	async function fetchAllMeals(givenUserId) {
		let temp = await readAllMeals(givenUserId);
		temp = temp.data;
		setUserMealList(temp);

		let carbs = 0;
		for (var i = 0; i < temp.length; i++) {
			let meal = temp[i];
			let value = meal.carbohydrates.slice(0, -1);
			carbs += Number(value);
		}

		setTotalCarbs(carbs);
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
							Today's Carb Intake
						</h2>
						<p className="text-center text-green-600 font-semibold text-3xl">
							{totalCarbs}g
						</p>
					</div>

					<div className="bg-green-50 border border-green-300 rounded-lg flex flex-col py-4 px-10">
						<h2 className="text-xl font-bold text-green-800 mb-3 text-center">
							Intake Breakdown
						</h2>
						<table className="border-spacing-y-[8px] border-separate">
							<thead>
								<tr>
									<th className="text-left">Meal</th>
									<th className="text-left">Calories</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{userMealList.map((item, i) => {
									return i % 2 == 0 ? (
										<tr
											key={item.meal_id}
											className="bg-green-100"
										>
											<td className="p-1">{item.name}</td>
											<td>{item.carbohydrates}</td>
											<td
												className="hover:cursor-pointer font-bold text-green-800"
												onClick={() =>
													handleDeleteMeal(item, i)
												}
											>
												X
											</td>
										</tr>
									) : (
										<tr key={item.meal_id}>
											<td className="p-1">{item.name}</td>
											<td>{item.carbohydrates}</td>
											<td
												className="hover:cursor-pointer font-bold text-green-800"
												onClick={() =>
													handleDeleteMeal(item, i)
												}
											>
												X
											</td>
										</tr>
									);
								})}
							</tbody>
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
							{totalCals} cal
						</p>
					</div>

					<div className="bg-green-50 border border-green-300 rounded-lg flex flex-col py-4 px-10">
						<h2 className="text-xl font-bold text-green-800 mb-3 text-center">
							Burn Breakdown
						</h2>
						<table className="border-spacing-y-[8px] border-separate">
							<thead>
								<tr>
									<th className="text-left">Activity</th>
									<th className="text-left">Duration</th>
									<th className="text-left">Burned</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{userExcerciseList.map((item, i) => {
									return i % 2 == 0 ? (
										<tr
											key={item.exercise_id}
											className="bg-green-100"
										>
											<td className="p-1">{item.name}</td>
											<td>{item.duration_minutes}</td>
											<td>{item.calories_per_hour}</td>
											<td
												className="hover:cursor-pointer font-bold text-green-800"
												onClick={() =>
													handleDeleteExercise(
														item,
														i
													)
												}
											>
												X
											</td>
										</tr>
									) : (
										<tr key={item.exercise_id}>
											<td className="p-1">{item.name}</td>
											<td>{item.duration_minutes}</td>
											<td>{item.calories_per_hour}</td>
											<td
												className="hover:cursor-pointer font-bold text-green-800"
												onClick={() =>
													handleDeleteExercise(
														item,
														i
													)
												}
											>
												X
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	);
}
