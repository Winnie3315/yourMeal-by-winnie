"use client";

import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import { Category } from '@/modules/category';
import { useRouter } from "next/navigation";

interface NavProps {
    language: string;
}

const Nav: React.FC<NavProps> = ({ language }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const router = useRouter()

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch('http://localhost:3000/api/category');
                const data = await res.json();
                console.log("Category ", data.data);
                setCategories(data.data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleNewArrivalsClick = () => {
        router.push(`/`);
    };

    return (
        <div className="navigators w-full flex justify-center items-center">
            <nav className="nav-cont flex overflow-auto gap-[20px] w-[1200px] max-992:w-[700px]">
                <div onClick={handleNewArrivalsClick}>
                    <div className="flex items-center nav-p gap-[8px] bg-[#F9F9F9] px-[14px] py-[8px] rounded-[50px] cursor-pointer">
                        <img src="/images/menuAll.jpg" alt="all" className="object-cover rounded-full w-[32px] h-[32px]"/>
                        <p className="text-[14px]">{language === 'ru' ? 'Новинки' : 'New'}</p>
                    </div>
                </div>

                {categories.map((category, index) => (
                    <Navigation key={index} img={category.imageUrl} titles={category.titles} categoryId={category._id} language={language} />
                ))}
            </nav>
        </div>
    );
};

export default Nav;
