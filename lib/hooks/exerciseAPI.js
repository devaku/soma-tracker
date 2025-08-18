import { useState } from 'react';

export function useExerciseAPI() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchCaloriesBurned = async (activity, weight, duration) => {
		if (!activity || !activity.trim()) {
			throw new Error('Activity parameter is required');
		}

		setLoading(true);
		setError(null);

		try {
			// Build query parameters - only add weight and duration if provided
			const params = new URLSearchParams({
				activity: activity.trim(),
			});

			if (weight !== undefined && weight !== null) {
				params.append('weight', weight.toString());
			}

			if (duration !== undefined && duration !== null) {
				params.append('duration', duration.toString());
			}

			const response = await fetch(
				`https://api.api-ninjas.com/v1/caloriesburned?${params.toString()}`,
				{
					method: 'GET',
					headers: {
						'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_API_KEY,
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					`API request failed with status: ${response.status}`
				);
			}

			const data = await response.json();

			// Validate response structure
			if (!data) {
				throw new Error('No data received from calories burned API');
			}

			// Check if it's directly an array (expected format)
			if (Array.isArray(data)) {
				return data;
			}

			throw new Error(
				`Invalid response format from calories burned API. Received: ${JSON.stringify(data)}`
			);
		} catch (err) {
			const errorMessage =
				err.message || 'Failed to fetch calories burned data';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		fetchCaloriesBurned,
		loading,
		error,
	};
}

// Helper function to format exercise data for display
export function formatExerciseData(exerciseItems) {
	if (!exerciseItems || exerciseItems.length === 0) {
		return null;
	}

	// Return all items or just the first one based on your needs
	return exerciseItems.map((item) => ({
		name: item.name || 'Unknown Activity',
		caloriesPerHour: item.calories_per_hour || 0,
		totalCalories: item.total_calories || 0,
		durationMinutes: item.duration_minutes || 0,
		weightPounds: item.weight_pounds || 160,
	}));
}

// Alternative hook for multiple exercise queries
export function useExerciseAPIBatch() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMultipleExercises = async (exercises) => {
		if (!exercises || exercises.length === 0) {
			throw new Error('Exercises array is required');
		}

		// Validate that we don't exceed 10 activities limit
		if (exercises.length > 10) {
			throw new Error('Maximum 10 activities allowed per request');
		}

		setLoading(true);
		setError(null);

		try {
			const promises = exercises.map((exercise) => {
				const { activity, weight, duration } = exercise;

				// Build query parameters - only add weight and duration if provided
				const params = new URLSearchParams({
					activity: activity.trim(),
				});

				if (weight !== undefined && weight !== null) {
					params.append('weight', weight.toString());
				}

				if (duration !== undefined && duration !== null) {
					params.append('duration', duration.toString());
				}

				return fetch(
					`https://api.api-ninjas.com/v1/caloriesburned?${params.toString()}`,
					{
						method: 'GET',
						headers: {
							'X-Api-Key':
								process.env.NEXT_PUBLIC_API_NINJAS_API_KEY,
							'Content-Type': 'application/json',
						},
					}
				);
			});

			const responses = await Promise.all(promises);

			// Check if all responses are ok
			responses.forEach((response, index) => {
				if (!response.ok) {
					throw new Error(
						`API request failed for exercise "${exercises[index].activity}" with status: ${response.status}`
					);
				}
			});

			const dataPromises = responses.map((response) => response.json());
			const results = await Promise.all(dataPromises);

			// Flatten all items from all responses
			const allItems = results.reduce((acc, result) => {
				if (Array.isArray(result)) {
					acc.push(...result);
				} else if (result && typeof result === 'object') {
					acc.push(result);
				}
				return acc;
			}, []);

			return allItems;
		} catch (err) {
			const errorMessage =
				err.message || 'Failed to fetch calories burned data';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		fetchMultipleExercises,
		loading,
		error,
	};
}
