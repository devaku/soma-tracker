'use client';
import { useState } from 'react';
import { useLoginChecker } from '@/lib/hooks/useLoginChecker';
import { useExerciseAPI, formatExerciseData } from '@/lib/hooks/exerciseAPI';
import { createExercise } from '@/lib/services/api';
import { useUserAuth } from '@/lib/context/auth_context';
import { getExpectedRequestStore } from 'next/dist/server/app-render/work-unit-async-storage.external';

export default function ExercisePage() {
	const [activityName, setActivityName] = useState('');
	const [weight, setWeight] = useState();
	const [duration, setDuration] = useState();
	const [exerciseData, setExerciseData] = useState(null);
	const { user, firebaseSignOut } = useUserAuth();
	const userId = user?.uid;

	const { fetchCaloriesBurned, loading, error } = useExerciseAPI();
	useLoginChecker();

	function handleActivityNameChange(e) {
		setActivityName(e.target.value);
	}

	function handleWeightChange(e) {
		setWeight(Number(e.target.value));
	}

	function handleDurationChange(e) {
		setDuration(Number(e.target.value));
	}

	async function handleSubmitExerciseClick(exercise) {
		let newExercise = {
			name: exercise.name,
			calories_per_hour: exercise.caloriesPerHour,
			duration_minutes: exercise.durationMinutes,
			totall_calories:
				exercise.caloriesPerHour * (exercise.durationMinutes / 60),
		};

		await createExercise(userId, [newExercise]);
	}

	async function handleSubmitExercise() {
		if (weight < 50 || weight > 500) {
			alert('Please enter a weight value between 50 and 500');
			return;
		}

		if (duration < 1) {
			alert('Please enter a duration value greater than 1');
			return;
		}

		if (!activityName.trim()) {
			alert('Please enter an activity name');
			return;
		}

		try {
			const exerciseItems = await fetchCaloriesBurned(
				activityName,
				weight,
				duration
			);

			if (exerciseItems && exerciseItems.length > 0) {
				const formattedData = formatExerciseData(exerciseItems);
				setExerciseData(formattedData);
			} else {
				alert('No exercise data found for this activity');
				setExerciseData(null);
			}
		} catch (error) {
			alert(`Error fetching exercise data: ${error.message}`);
			console.error(error);
			setExerciseData(null);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
			<div className="max-w-2xl mx-auto">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-green-800 mb-2">
						Exercise Tracker
					</h1>
					<p className="text-green-600">
						Enter an activity to calculate calories burned
					</p>
				</div>

				{/* Input Section */}
				<div className="bg-green-50 rounded-lg p-6 mb-6 border border-green-200">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
						<div>
							<label
								htmlFor="activity_name"
								className="block text-green-800 font-semibold mb-2"
							>
								Activity Name
							</label>
							<input
								type="text"
								id="activity_name"
								value={activityName}
								onChange={handleActivityNameChange}
								placeholder="e.g., running, swimming, cycling"
								className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200"
							/>
						</div>

						<div>
							<label
								htmlFor="weight"
								className="block text-green-800 font-semibold mb-2"
							>
								Weight (lbs)
							</label>
							<input
								type="number"
								id="weight"
								value={weight}
								onChange={handleWeightChange}
								min="50"
								max="500"
								className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200"
							/>
						</div>

						<div>
							<label
								htmlFor="duration"
								className="block text-green-800 font-semibold mb-2"
							>
								Duration (min)
							</label>
							<input
								type="number"
								id="duration"
								value={duration}
								onChange={handleDurationChange}
								min="1"
								className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200"
							/>
						</div>
					</div>

					<button
						onClick={handleSubmitExercise}
						disabled={loading}
						className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
					>
						{loading ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Calculating...
							</>
						) : (
							'Calculate Calories Burned'
						)}
					</button>
				</div>

				{/* Exercise Information Box */}
				{exerciseData && exerciseData.length > 0 && (
					<div className="bg-white border-2 border-green-300 rounded-lg p-6 shadow-lg">
						<h2 className="text-2xl font-bold text-green-800 mb-4">
							Calories Burned Results
						</h2>

						{exerciseData.map((exercise, index) => (
							<div key={index} className="mb-6 last:mb-0">
								<div className="flex justify-between">
									<h3 className="text-xl font-semibold text-green-700 mb-4">
										{exercise.name}
									</h3>

									<button
										className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg px-3 py-1 mb-4"
										onClick={() =>
											handleSubmitExerciseClick(exercise)
										}
									>
										Save
									</button>
								</div>

								{/* Main Stats */}
								<div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
										<div>
											<span className="block text-sm text-green-600">
												Total Calories
											</span>
											<span className="text-2xl font-bold text-green-800">
												{exercise.totalCalories}
											</span>
										</div>
										<div>
											<span className="block text-sm text-green-600">
												Calories/Hour
											</span>
											<span className="text-xl font-semibold text-green-800">
												{exercise.caloriesPerHour}
											</span>
										</div>
										<div>
											<span className="block text-sm text-green-600">
												Duration
											</span>
											<span className="text-lg font-semibold text-green-800">
												{exercise.durationMinutes} min
											</span>
										</div>
										<div>
											<span className="block text-sm text-green-600">
												Weight
											</span>
											<span className="text-lg font-semibold text-green-800">
												{exercise.weightPounds} lbs
											</span>
										</div>
									</div>
								</div>

								{/* Additional Information */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="bg-green-50 p-4 rounded-lg border border-green-200">
										<h4 className="font-semibold text-green-800 mb-2">
											Exercise Details
										</h4>
										<div className="space-y-2 text-green-700">
											<div className="flex justify-between">
												<span>Activity:</span>
												<span className="font-medium">
													{exercise.name}
												</span>
											</div>
											<div className="flex justify-between">
												<span>Time Spent:</span>
												<span className="font-medium">
													{exercise.durationMinutes}{' '}
													minutes
												</span>
											</div>
										</div>
									</div>

									<div className="bg-green-50 p-4 rounded-lg border border-green-200">
										<h4 className="font-semibold text-green-800 mb-2">
											Calorie Breakdown
										</h4>
										<div className="space-y-2 text-green-700">
											<div className="flex justify-between">
												<span>Per Hour:</span>
												<span className="font-medium">
													{exercise.caloriesPerHour}{' '}
													cal
												</span>
											</div>
											<div className="flex justify-between">
												<span>Total Burned:</span>
												<span className="font-medium">
													{exercise.totalCalories} cal
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Empty State */}
				{!exerciseData && !loading && (
					<div className="bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-8 text-center">
						<div className="text-green-600 mb-2">
							<svg
								className="mx-auto h-12 w-12 mb-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 48 48"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 10V3L4 14l9 11v-7h14a2 2 0 002-2v-4a2 2 0 00-2-2H13z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-green-800 mb-1">
							No exercise calculated yet
						</h3>
						<p className="text-green-600">
							Enter an activity above to see calories burned
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
