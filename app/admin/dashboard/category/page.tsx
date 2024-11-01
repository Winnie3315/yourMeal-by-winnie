"use client"

import React, { useEffect, useState } from 'react';
import Modal_Category from '@/components/Modal_Category';
import CategoryAdmin from '@/components/CategoryAdmin';

interface CategoryPageProps { }

interface Category {
    _id: string;
    imageUrl: string;
    titles: { ru: string; en: string };
}

const CategoryPage: React.FC<CategoryPageProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/category');
            if (!res.ok) throw new Error("Ошибка при получении данных");

            const response = await res.json();
            setCategories(response.data);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Ошибка:", error.message);
            } else {
                console.error("Ошибка:", error);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [isDataUpdated]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleDataUpdate = () => {
        setIsDataUpdated(prev => !prev);
        setIsModalOpen(false);
    };

    const handleUpdate = (id: string, updatedItem: Category) => {
        setCategories(prevItems =>
            prevItems.map(item => (item._id === id ? updatedItem : item))
        );
    };

    const handleDelete = async (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту категорию?")) {
            try {
                const response = await fetch(`/api/category/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Ошибка при удалении категории');
                }

                const data = await response.json();
                if (data.success) {
                    setCategories(prev => prev.filter(category => category._id !== id));
                } else {
                    alert(data.message);
                }
            } catch (error) {
                if (error instanceof Error) {
                    alert('Ошибка: ' + error.message);
                } else {
                    alert('Ошибка: ' + String(error));
                }
            }
        }
    };

    return (
        <div>
            <div className="dashboard flex justify-between items-center">
                <h1 className='text-[50px] text-[#ff7020] font-[600]'>Category</h1>
                <Modal_Category isOpen={isModalOpen} closeModal={handleDataUpdate} />
                <button onClick={openModal} className='w-[100px] h-[40px] rounded-xl bg-[#ff7020] text-white'>Add category</button>
            </div>
            <div className="product-cont-admin grid gap-[30px] mt-5">
                {categories.map((category) => (
                    category && category._id ? (
                        <CategoryAdmin
                            key={category._id}
                            id={category._id}
                            img={category.imageUrl}
                            titles={category.titles}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ) : null
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
