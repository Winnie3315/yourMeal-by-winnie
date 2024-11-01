"use client";

import AdminProduct from '@/components/AdminProduct';
import Modal_Form from '@/components/Modal_form';
import { Menu } from '@/modules/menu';
import React, { useEffect, useState } from 'react';

interface MenuPageProps {}

const MenuPage: React.FC<MenuPageProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [menuItems, setMenuItems] = useState<Menu[]>([]);
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/menu');
                if (!res.ok) throw new Error("Ошибка при получении данных");
    
                const response = await res.json();
                console.log("Response from API:", response);
                setMenuItems(response.data);
            } catch (error) {
                console.error("Ошибка:", error);
            }
        };

        fetchMenuItems();
    }, [isDataUpdated]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleDataUpdate = () => {
        setIsDataUpdated(prev => !prev);
        setIsModalOpen(false);
    };

    const handleUpdate = (id: string, updatedItem: Menu) => {
        setMenuItems(prevItems =>
            prevItems.map(item => (item._id === id ? updatedItem : item))
        );
    };

    const handleDelete = async (id: string) => {
        if (confirm("Вы уверены, что хотите удалить этот продукт?")) {
            try {
                const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Ошибка при удалении продукта');
                }

                const data = await response.json();
                if (data.success) {
                    setMenuItems(prevItems => prevItems.filter(item => item._id !== id));
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
                <h1 className='text-[50px] text-[#ff7020] font-[600]'>Menu</h1>
                <Modal_Form isOpen={isModalOpen} closeModal={handleDataUpdate} />
                <button onClick={openModal} className='w-[100px] h-[40px] rounded-xl bg-[#ff7020] text-white'>Add menu</button>
            </div>
            <div className="product-cont-admin grid gap-[30px] mt-5">
                {menuItems.map((item, index) => (
                    <AdminProduct
                        key={item._id}
                        id={item._id}
                        img={item.imageUrl}
                        price={item.price}
                        weight={item.weight}
                        titles={item.titles}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}  
            </div>
        </div>
    );
};

export default MenuPage;
