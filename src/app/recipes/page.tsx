// src/app/recipes/page.tsx

import { Suspense } from 'react';
import RecipesList from './RecipesList';

type Recipe = {
  id: number;
  title: string;
  image: string;
};

type RecipesResponse = {
  results: Recipe[];
};

type Props = {
  searchParams: {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  };
};

const API_KEY = process.env.SPOONACULAR_API_KEY;

export const revalidate = 60;

async function fetchRecipes(
  query?: string,
  cuisine?: string,
  maxReadyTime?: string
): Promise<Recipe[]> {
  const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  const params = new URLSearchParams();

  if (API_KEY) params.append('apiKey', API_KEY);
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

  const url = `${baseUrl}?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }

  const data: RecipesResponse = await res.json();
  return data.results;
}

export default async function RecipesPage({ searchParams }: Props) {
  const { query, cuisine, maxReadyTime } = searchParams || {};

  let recipes: Recipe[] = [];

  try {
    recipes = await fetchRecipes(query, cuisine, maxReadyTime);
  } catch {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Error loading recipes. Please try again later.</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>No recipes found.</p>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <Suspense fallback={<div>Loading recipes...</div>}>
        <RecipesList recipes={recipes} />
      </Suspense>
    </main>
  );
}
