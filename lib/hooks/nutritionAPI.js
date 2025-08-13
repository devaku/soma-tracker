import { useState } from 'react';

export function useNutritionAPI() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchNutrition = async (query) => {
		if (!query || !query.trim()) {
			throw new Error('Query parameter is required');
		}

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
				{
					method: 'GET',
					headers: {
						'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_KEY,
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

			// Debug: Log the actual response to see its structure
			console.log('API Response:', data);

			// Validate response structure
			if (!data) {
				throw new Error('No data received from nutrition API');
			}

			// Check if it's directly an array (some APIs return array directly)
			if (Array.isArray(data)) {
				return data;
			}

			// If it's a single object, wrap it in an array
			if (typeof data === 'object' && data.name) {
				return [data];
			}

			throw new Error(
				`Invalid response format from nutrition API. Received: ${JSON.stringify(data)}`
			);

			return data.items;
		} catch (err) {
			const errorMessage =
				err.message || 'Failed to fetch nutrition data';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		fetchNutrition,
		loading,
		error,
	};
}

// Helper function to format nutrition data for display
export function formatNutritionData(nutritionItems) {
	if (!nutritionItems || nutritionItems.length === 0) {
		return null;
	}

	// If multiple items, combine them or return the first one
	// You can modify this logic based on your needs
	const item = nutritionItems[0];

	// Helper function to safely get numeric values or return 'Premium only'
	const getValue = (value, unit = '') => {
		if (
			typeof value === 'string' &&
			value.includes('premium subscribers')
		) {
			return 'Premium only';
		}
		if (typeof value === 'number') {
			return `${value}${unit}`;
		}
		return `${value || 0}${unit}`;
	};

	return {
		name: item.name || 'Unknown',
		calories: getValue(item.calories),
		servingSize: getValue(item.serving_size_g, 'g'),
		totalFat: getValue(item.fat_total_g, 'g'),
		saturatedFat: getValue(item.fat_saturated_g, 'g'),
		sodium: getValue(item.sodium_mg, 'mg'),
		potassium: getValue(item.potassium_mg, 'mg'),
		cholesterol: getValue(item.cholesterol_mg, 'mg'),
		carbohydrates: getValue(item.carbohydrates_total_g, 'g'),
		fiber: getValue(item.fiber_g, 'g'),
		sugar: getValue(item.sugar_g, 'g'),
		protein: getValue(item.protein_g, 'g'),
	};
}

// Alternative hook for multiple nutrition items
export function useNutritionAPIBatch() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMultipleNutrition = async (queries) => {
		if (!queries || queries.length === 0) {
			throw new Error('Queries array is required');
		}

		setLoading(true);
		setError(null);

		try {
			const promises = queries.map((query) =>
				fetch(
					`https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
					{
						method: 'GET',
						headers: {
							'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJAS_KEY,
							'Content-Type': 'application/json',
						},
					}
				)
			);

			const responses = await Promise.all(promises);

			// Check if all responses are ok
			responses.forEach((response, index) => {
				if (!response.ok) {
					throw new Error(
						`API request failed for query "${queries[index]}" with status: ${response.status}`
					);
				}
			});

			const dataPromises = responses.map((response) => response.json());
			const results = await Promise.all(dataPromises);

			// Flatten all items from all responses
			const allItems = results.reduce((acc, result) => {
				if (result && Array.isArray(result.items)) {
					acc.push(...result.items);
				}
				return acc;
			}, []);

			return allItems;
		} catch (err) {
			const errorMessage =
				err.message || 'Failed to fetch nutrition data';
			setError(errorMessage);
			throw new Error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		fetchMultipleNutrition,
		loading,
		error,
	};
}
