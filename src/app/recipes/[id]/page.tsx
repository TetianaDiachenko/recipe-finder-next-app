import Image from 'next/image';

type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  summary: string;
  readyInMinutes: number;
  servings: number;
};

type PageProps = {
  params: {
    id: string;
  };
};

const API_KEY = process.env.SPOONACULAR_API_KEY;

export const revalidate = 60;

async function fetchRecipeDetails(id: string): Promise<RecipeDetails> {
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  return res.json();
}

export default async function RecipeDetailsPage({ params }: PageProps) {
  let recipe: RecipeDetails;

  try {
    recipe = await fetchRecipeDetails(params.id);
  } catch {
    return (
      <div className="p-6 text-center text-red-600">
        <p> Failed to load recipe details</p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={600}
        height={400}
        className="rounded-lg mb-6"
      />
      <p
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: recipe.summary }}
      />
      <ul className="list-disc list-inside text-gray-700">
        <li>Час приготування: {recipe.readyInMinutes} хв</li>
        <li>Порції: {recipe.servings}</li>
      </ul>
    </main>
  );
}
