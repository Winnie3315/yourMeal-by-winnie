"use client"

import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Category } from '@/modules/category';
import { useRouter } from 'next/router';

interface NavProps {
    
}

const Nav: React.FC<NavProps> = () => {
    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() => {
        async function fetchCategories() {
          try {
            const res = await fetch('http://localhost:3000/api/category');
            const data = await res.json();
            setCategories(data.data);
          } catch (error) {
            console.error('Ошибка при загрузке категорий:', error);
          }
        }
        fetchCategories();
      }, []);

    return (
        <div className="navigators w-full flex justify-center items-center">
        <nav className="nav-cont flex overflow-auto gap-[20px] w-[1200px]">
            {categories.map((category, index) => (
                <Navigation key={index} img={category.images} title={category.titles} categoryId={category._id} />
            ))}
        </nav>
    </div>
    );
};

export default Nav;