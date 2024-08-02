'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ICategory } from '@/interface/event.interface';

const CategoryClick = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: ICategory[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    router.push(`/events/search-result?category=${category}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 mt-4">Sort By Category</h1>
      <div className="flex flex-wrap mt-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="bg-red-500 text-white rounded-full px-4 py-2 m-1 text-sm lg:text-base font-semibold hover:bg-red-400 transition-all"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryClick;
