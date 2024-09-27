"use client"
import AdminProduct from '@/components/AdminProduct';
import Modal_Form from '@/components/Modal_form';
import Product from '@/components/Product';
import { Menu } from '@/modules/menu';
import React, { useEffect, useState } from 'react';

interface MenuPageProps {
    
}

const MenuPage: React.FC<MenuPageProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDataUpdated, setIsDataUpdated] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [menuItems, setMenuItems] = useState<Menu[]>([]);

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
        closeModal();
    };

    console.log(menuItems);
    return (
        <div>
            <div className="dashboard flex justify-between">
                <h1 className='text-[50px] font-[600]'>Menu</h1>
                <Modal_Form isOpen={isModalOpen} onClose={handleDataUpdate}/>
                <button onClick={openModal} className='w-[100px] h-[40px] rounded-xl bg-orange-400 text-white'>add menu</button>
            </div>
            <div className="product-cont-admin grid gap-[30px] mt-5">
                {menuItems.map((item, index) => (
                    <AdminProduct
                        key={index}
                        img={item.image}
                        price={item.price}
                        weight={item.weight}
                        title={item.title}
                    />
                ))}  
            </div>

        </div>
    );
};

export default MenuPage;