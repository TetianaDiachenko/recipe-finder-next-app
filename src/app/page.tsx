"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SearchPage = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    if (query.trim() !== "" || cuisine !== "" || maxTime.trim() !== "") {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [query, cuisine, maxTime]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-8">Recipe Finder</h1>

      <form
        className="w-full max-w-md space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (isNextEnabled) {
            const params = new URLSearchParams();
            if (query) params.append("query", query);
            if (cuisine) params.append("cuisine", cuisine);
            if (maxTime) params.append("maxReadyTime", maxTime);
            router.push(`/recipes?${params.toString()}`);
          }
        }}
      >
        <div>
          <label htmlFor="query" className="block mb-1 font-semibold">
            Search Query
          </label>
          <input
            id="query"
            type="text"
            placeholder="e.g., pasta"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="cuisine" className="block mb-1 font-semibold">
            Cuisine
          </label>
          <select
            id="cuisine"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div>
          <label htmlFor="maxTime" className="block mb-1 font-semibold">
            Max Preparation Time (minutes)
          </label>
          <input
            id="maxTime"
            type="number"
            min="1"
            placeholder="e.g., 30"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={!isNextEnabled}
          className={`w-full py-2 rounded text-white font-semibold ${
            isNextEnabled
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default SearchPage;
