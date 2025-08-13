'use client';
import { useState } from 'react';
import { useLoginChecker } from '@/lib/hooks/useLoginChecker';
import { useNutritionAPI, formatNutritionData } from '@/lib/hooks/nutritionAPI';

export default function MealPage() {
	const [mealName, setMealName] = useState('');
	const [nutritionData, setNutritionData] = useState(null);

	const { fetchNutrition, loading, error } = useNutritionAPI();
	useLoginChecker();

	function handleMealNameChange(e) {
		setMealName(e.target.value);
	}

	async function handleSubmitMeal() {
		if (!mealName.trim()) {
			alert('Please enter a meal name');
			return;
		}

		try {
			const nutritionItems = await fetchNutrition(mealName);

			if (nutritionItems && nutritionItems.length > 0) {
				const formattedData = formatNutritionData(nutritionItems);
				setNutritionData(formattedData);
			} else {
				alert('No nutrition data found for this meal');
				setNutritionData(null);
			}
		} catch (error) {
			alert(`Error fetching nutrition data: ${error.message}`);
			console.error(error);
			setNutritionData(null);
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl">
			<div className="max-w-2xl mx-auto">
				{/* Page Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-green-800 mb-2">
						Meal Tracker
					</h1>
					<p className="text-green-600">
						Enter a meal to get its nutritional information
					</p>
				</div>

				{/* Input Section */}
				<div className="bg-green-50 rounded-lg p-6 mb-6 border border-green-200">
					<div className="mb-4">
						<label
							htmlFor="meal_name"
							className="block text-green-800 font-semibold mb-2"
						>
							Meal Name
						</label>
						<input
							type="text"
							id="meal_name"
							value={mealName}
							onChange={handleMealNameChange}
							placeholder="Enter meal name (e.g., chicken breast, apple, etc.)"
							className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-200"
						/>
					</div>

					<button
						onClick={handleSubmitMeal}
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
								Searching...
							</>
						) : (
							'Get Nutrition Info'
						)}
					</button>
				</div>

				{/* Nutrition Information Box */}
				{nutritionData && (
					<div className="bg-white border-2 border-green-300 rounded-lg p-6 shadow-lg">
						<h2 className="text-2xl font-bold text-green-800 mb-4">
							Nutrition Information for "{nutritionData.name}"
						</h2>

						{/* Calories and Serving Size */}
						<div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
								<div>
									<span className="block text-sm text-green-600">
										Calories
									</span>
									<span className="text-2xl font-bold text-green-800">
										{nutritionData.calories}
									</span>
								</div>
								<div>
									<span className="block text-sm text-green-600">
										Serving Size
									</span>
									<span className="text-lg font-semibold text-green-800">
										{nutritionData.servingSize}
									</span>
								</div>
								<div>
									<span className="block text-sm text-green-600">
										Protein
									</span>
									<span className="text-lg font-semibold text-green-800">
										{nutritionData.protein}
									</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="bg-green-50 p-4 rounded-lg border border-green-200">
								<h3 className="font-semibold text-green-800 mb-2">
									Fats
								</h3>
								<div className="space-y-2 text-green-700">
									<div className="flex justify-between">
										<span>Total Fat:</span>
										<span className="font-medium">
											{nutritionData.totalFat}
										</span>
									</div>
									<div className="flex justify-between">
										<span>Saturated Fat:</span>
										<span className="font-medium">
											{nutritionData.saturatedFat}
										</span>
									</div>
								</div>
							</div>

							<div className="bg-green-50 p-4 rounded-lg border border-green-200">
								<h3 className="font-semibold text-green-800 mb-2">
									Minerals
								</h3>
								<div className="space-y-2 text-green-700">
									<div className="flex justify-between">
										<span>Sodium:</span>
										<span className="font-medium">
											{nutritionData.sodium}
										</span>
									</div>
									<div className="flex justify-between">
										<span>Potassium:</span>
										<span className="font-medium">
											{nutritionData.potassium}
										</span>
									</div>
									<div className="flex justify-between">
										<span>Cholesterol:</span>
										<span className="font-medium">
											{nutritionData.cholesterol}
										</span>
									</div>
								</div>
							</div>

							<div className="bg-green-50 p-4 rounded-lg border border-green-200 md:col-span-2">
								<h3 className="font-semibold text-green-800 mb-2">
									Carbohydrates
								</h3>
								<div className="grid grid-cols-3 gap-4 text-green-700">
									<div className="flex flex-col items-center">
										<span className="text-sm">
											Total Carbohydrates
										</span>
										<span className="font-medium text-lg">
											{nutritionData.carbohydrates}
										</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="text-sm">Fiber</span>
										<span className="font-medium text-lg">
											{nutritionData.fiber}
										</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="text-sm">Sugar</span>
										<span className="font-medium text-lg">
											{nutritionData.sugar}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Empty State */}
				{!nutritionData && !loading && (
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
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-medium text-green-800 mb-1">
							No meal searched yet
						</h3>
						<p className="text-green-600">
							Enter a meal name above to see its nutritional
							information
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
