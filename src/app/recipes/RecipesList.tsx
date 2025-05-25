"use client";

import Link from "next/link";
import Image from "next/image";

type Recipe = {
  id: number;
  title: string;
  image: string;
};

type Props = {
  recipes: Recipe[];
};

export default function RecipesList({ recipes }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map(({ id, title, image }) => (
        <li
          key={id}
          className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={`/recipes/${id}`}>
            <a>
              <Image
                src={image}
                alt={title}
                width={400}
                height={300}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}